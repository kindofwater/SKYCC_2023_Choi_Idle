const recommend = require("./recommend");

// '대두', '돼지고기', '쇠고기', '우유', '아황산류', '호두', '계란', '밀', '새우', '계란밀', '토마토', '닭고기', '조개류' (13개)

// Menu data
const subway = {
    "에그마요 샌드위치": {
        ingredients: ["밀", "계란", "대두", "토마토", "우유", "조개류"],
        name: "에그마요 샌드위치",
    },
    "햄 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기"],
        name: "햄 샌드위치",
    },
    "이탈리안 비엠티 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "대두", "돼지고기"],
        name: "이탈리안 비엠티 샌드위치",
    },
};

const subways = {
    "B.L.T. 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기"],
        name: "B.L.T. 샌드위치",
    },
    "치킨 데리야끼 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "닭고기"],
        name: "치킨 데리야끼 샌드위치",
    },
    "에그마요 샌드위치": {
        ingredients: ["밀", "계란", "대두", "토마토", "우유", "조개류"],
        name: "에그마요 샌드위치",
    },
    "햄 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기"],
        name: "햄 샌드위치",
    },
    "이탈리안 비엠티 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "대두", "돼지고기"],
        name: "이탈리안 비엠티 샌드위치",
    },
    "K-바비큐 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기"],
        name: "K-바비큐 샌드위치",
    },
    "미트볼 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "쇠고기", "닭고기"],
        name: "미트볼 샌드위치",
    },
    "풀드 포크 바비큐 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기"],
        name: "풀드 포크 바비큐 샌드위치",
    },
    "로스트 치킨 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "쇠고기", "닭고기"],
        name: "로스트 치킨 샌드위치",
    },
    "로티세리 바비큐 치킨 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "닭고기"],
        name: "로티세리 바비큐 치킨 샌드위치",
    },
    "쉬림프 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "새우"],
        name: "쉬림프 샌드위치",
    },
    "스파이시 이탈리안 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기"],
        name: "스파이시 이탈리안 샌드위치",
    },
    "스테이크 & 치즈 (아메리칸 치즈 포함) 샌드위치": {
        ingredients: ["밀", "우유", "대두", "토마토", "쇠고기"],
        name: "스테이크 & 치즈 (아메리칸 치즈 포함) 샌드위치",
    },
    "써브웨이 클럽 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기", "닭고기"],
        name: "써브웨이 클럽 샌드위치",
    },
    // "베지 샌드위치": {
    //     ingredients: ["밀", "대두", "토마토"],
    //     name: "베지 샌드위치",
    // },
    // "참치 샌드위치": {
    //     ingredients: ["밀", "계란", "대두", "토마토"],
    //     name: "참치 샌드위치",
    // },
    // "터키 샌드위치": {
    //     ingredients: ["밀", "대두", "토마토"],
    //     name: "터키 샌드위치",
    // },
    "터키 베이컨 아보카도 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기"],
        name: "터키 베이컨 아보카도 샌드위치",
    },
    "스파이시 쉬림프 샌드위치": {
        ingredients: ["밀", "우유", "대두", "토마토", "새우"],
        name: "스파이시 쉬림프 샌드위치",
    },
    "스파이시 쉬림프 아보카도 샌드위치": {
        ingredients: ["밀", "우유", "대두", "토마토", "새우"],
        name: "스파이시 쉬림프 아보카도 샌드위치",
    },
    "머쉬룸 샌드위치": {
        ingredients: ["밀", "토마토", "우유", "대두", "쇠고기", "조개류"],
        name: "머쉬룸 샌드위치",
    },
    "치킨 슬라이스 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "닭고기"],
        name: "치킨 슬라이스 샌드위치",
    },
    "치킨 베이컨 아보카도 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기", "닭고기"],
        name: "치킨 베이컨 아보카도 샌드위치",
    },
    "스파이시 바비큐 샌드위치": {
        ingredients: ["밀", "대두", "토마토", "돼지고기"],
        name: "스파이시 바비큐 샌드위치",
    },
    "에그마요 베이컨 샌드위치": {
        ingredients: [
            "밀",
            "계란",
            "대두",
            "토마토",
            "돼지고기",
            "우유",
            "조개류",
        ],
        name: "에그마요 베이컨 샌드위치",
    },
    "에그마요 페퍼로니 샌드위치": {
        ingredients: [
            "밀",
            "계란",
            "대두",
            "토마토",
            "돼지고기",
            "우유",
            "조개류",
        ],
        name: "에그마요 페퍼로니 샌드위치",
    },
};
// "치킨 데리야끼 샌드위치": {
//     ingredients: ["밀", "대두", "토마토", "닭고기"],
//     name: "치킨 데리야끼 샌드위치",
// },
// "에그마요 샌드위치": {
//     ingredients: ["밀", "계란", "대두", "토마토", "우유", "조개류"],
//     name: "에그마요 샌드위치",
// },
// User data
const person1 = {
    name: "person1",
    criticals: ["돼지고기", "쇠고기", "닭고기"],
    preference: {
        "B.L.T. 샌드위치": 0,
        "로스트 치킨 샌드위치": 3,
        "에그마요 샌드위치": 5,
        "햄 샌드위치": 1,
    },
};

const person2 = {
    name: "person2",
    criticals: ["돼지고기", "쇠고기"],
    preference: {
        "햄 샌드위치": 5,
        "에그마요 샌드위치": 3,
        "B.L.T. 샌드위치": 0,
        "로스트 치킨 샌드위치": 5,
    },
};

const person3 = {
    name: "person3",
    criticals: ["조개류", "새우"],
    preference: {
        "햄 샌드위치": 5,
        "에그마요 샌드위치": 0,
        "치킨 데리야끼 샌드위치": 3,
        "B.L.T. 샌드위치": 5,
    },
};

const hater = {
    name: "hater",
    criticals: [
        "대두",
        "돼지고기",
        "쇠고기",
        "조개류(굴 전복 홍합 포함)",
        "우유",
        "아황산류",
        "호두",
        "계란",
        "밀",
        "새우",
        "계란밀",
        "토마토",
        "닭고기",
        "조개류",
    ],
    preference: {
        "햄 샌드위치": 5,
        "에그마요 샌드위치": 0,
        "치킨 데리야끼 샌드위치": 3,
        "B.L.T. 샌드위치": 5,
    },
};

const one_menu = [person1, person2];
const two_menu = [person1, person2, person3];
const no_menu = [person1, person2, person3, hater];

const slack_id = two_menu;
const menu = subways;

const rec = recommend.getFoodRecommendation(slack_id, menu);

for (let i = 0; i < slack_id.length; i++) {
    console.log(slack_id[i].name + " can't eat: " + slack_id[i].criticals);
}
// console.log("subway menu: " + Object.keys(menu) + "\n");
console.log("\n");
let output = [];

if (rec.num == 1) {
    console.log("*** 메뉴 통일 성공! ***");
    console.log(
        `${rec.list1.length} item(s) for you: ${rec.list1
            .map((item) => item.name)
            .join(", ")}`
    );
    console.log(
        `top1: ${rec.list1[0].name} | ingredient: ${
            subways[rec.list1[0].name].ingredients
        }\n`
    );
    output = [rec.list1, []];
} else if (rec.num == 2) {
    console.log("*** 2그룹으로 나누어 주문함 ***\n");

    console.log(
        `${rec.list1.length} item(s) for group1: ${rec.list1
            .map((item) => item.name)
            .join(", ")}`
    );
    console.log(
        `top1: ${rec.list1[0].name} | ingredient: ${
            subways[rec.list1[0].name].ingredients
        }\n`
    );
    console.log(
        `${rec.list2.length} item(s) for group2: ${rec.list2
            .map((item) => item.name)
            .join(", ")}`
    );
    console.log(
        `top1: ${rec.list2[0].name} | ingredient: ${
            subways[rec.list2[0].name].ingredients
        }\n`
    );

    output = [rec.list1, rec.list2];
} else {
    console.log(
        "*** 아무것도 못먹는 사람이 있거나 2가지 메뉴로 만족할 수 없음 ***"
    );
    output = [[], []];
}

const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    host: "skycc.c8pqhjn5wq1m.ap-northeast-2.rds.amazonaws.com",
    database: "skycc",
    password: "postgres",
    port: 5432,
});

client
    .connect()
    .then(() => {
        const text1 = output[0].map((item) => JSON.stringify(item));
        const text2 = output[1].map((item) => JSON.stringify(item));
        const query = {
            text: "INSERT INTO result VALUES ($1, $2);",
            values: [text1, text2],
        };

        return client.query(query);
    })
    .then((res) => {
        console.log(res);
    })
    .catch((e) => console.error(e.stack))
    .finally(() => {
        client.end(); // Close the connection after executing the query
    });

//output이 전달할 리스트

// 형식은 셋 중 하나
// 1. [[], []]
// 2. [["샌드위치이름1", "샌드위치이름2", ...], []]
// 3. [["샌드위치이름1", "샌드위치이름2", ...], ["샌드위치이름1", "샌드위치이름2", ...]]
