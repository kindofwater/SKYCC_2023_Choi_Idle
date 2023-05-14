function Recommend(num, list1, list2) {
    this.num = num;
    this.list1 = list1;
    this.list2 = list2;
}

function excludeCritical(persons, menu, critical) {
    const group1 = [],
        group2 = [];
    for (const person of persons) {
        if (person.criticals.includes(critical)) {
            group1.push(person);
        } else {
            group2.push(person);
        }
    }

    const group1Preferences = group1.map((person) => person.preference);
    const group2Preferences = group2.map((person) => person.preference);

    const rec1 = getFoodRecommendation(group1, menu, true);
    if (rec1.num == 0) return rec1;
    const rec2 = getFoodRecommendation(group2, menu, true);
    if (rec2.num == 0) return rec2;

    rec1.list1.sort((a, b) => {
        const aPref = group1Preferences.every((prefs) => prefs[a.id] >= 0);
        const bPref = group1Preferences.every((prefs) => prefs[b.id] >= 0);
        return bPref - aPref;
    });
    rec2.list1.sort((a, b) => {
        const aPref = group2Preferences.every((prefs) => prefs[a.id] >= 0);
        const bPref = group2Preferences.every((prefs) => prefs[b.id] >= 0);
        return bPref - aPref;
    });

    return new Recommend(2, rec1.list1, rec2.list1);
}

function secondBestRecommendation(persons, menu) {
    const critical = persons.map((person) => person.criticals);
    const allCritical = [...new Set(critical.flat())];

    // console.log(`2allCritical: ${allCritical}\n`);

    const criticalCounts = {};
    for (let i = 0; i < allCritical.length; i++) {
        const ingredient = allCritical[i];
        criticalCounts[ingredient] = 0;
        for (let j = 0; j < persons.length; j++) {
            const person = persons[j];
            if (person.criticals.includes(ingredient)) {
                criticalCounts[ingredient]++;
            }
        }
    }

    // TODO
    // critical로 인원 최대한 반반으로 나누기
    // allCritical.sort((a, b) => criticalCounts[b] - criticalCounts[a]);

    for (let i = 0; i < allCritical.length; i++) {
        // console.log(`2allCritical: ${allCritical}`);
        const rec = excludeCritical(persons, menu, allCritical[i]);
        // rec = [rec1 = [length, [], []], rec2 = [length, [], []]]
        if (rec.num == 2) {
            console.log(`list1 length: ${rec.list1.length}|`);
            console.log(`list2 length: ${rec.list2.length}|\n`);
            return rec;
        }
    }

    // console.log(`length가 0 or 1인 경우\n`);
    return new Recommend(0, [], []);
}

function getFoodRecommendation(persons, menu, flag = false) {
    if (menu.length <= 0) return [];

    const preferences = persons.map((person) => person.preference);
    const critical = persons.map((person) => person.criticals);
    const allCritical = [...new Set(critical.flat())];

    // console.log(`1allCritical: ${allCritical}\n`);

    // 모두가 먹을 수 있는 메뉴 filteredMenu
    const filteredMenu = Object.values(menu).filter((item) => {
        return !allCritical.some((ingredient) =>
            item.ingredients.includes(ingredient)
        );
    });

    // console.log(`filteredMenu 길이: ${filteredMenu.length}\n`);

    if (filteredMenu.length > 0) {
        filteredMenu.sort((a, b) => {
            const aPref = preferences.every((prefs) => prefs[a.id] || 0 >= 0);
            const bPref = preferences.every((prefs) => prefs[b.id] || 0 >= 0);
            return bPref - aPref;
        });
        return new Recommend(1, filteredMenu, []);
    }
    if (flag) return new Recommend(0, [], []);
    else return secondBestRecommendation(persons, menu);
}

module.exports = {
    getFoodRecommendation,
};
