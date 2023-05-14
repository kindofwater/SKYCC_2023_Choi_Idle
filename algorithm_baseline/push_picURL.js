const { Client } = require("pg");

const data = {
    "B.L.T. 샌드위치":
        "https://m.subway.co.kr/upload/menu/Italian_B.M.T_20211231094910899.png",
    "치킨 데리야끼 샌드위치":
        "https://m.subway.co.kr/upload/menu/Chicken-Teriyaki_20211231094803381.png",
    "에그마요 샌드위치":
        "https://m.subway.co.kr/upload/menu/Egg-Mayo_20211231094817112.png",
    "햄 샌드위치":
        "https://m.subway.co.kr/upload/menu/Ham_20211231094833168.png",
    "이탈리안 비엠티 샌드위치":
        "https://m.subway.co.kr/upload/menu/Italian_B.M.T_20211231094910899.png",
    "K-바비큐 샌드위치":
        "https://m.subway.co.kr/upload/menu/K-BBQ_20211231094930225.png",
    "미트볼 샌드위치":
        "https://www.subway.com/ns/images/menu/NZD/ENG/RPLC_Meatball_Melt_594x334.jpg",
    "풀드 포크 바비큐 샌드위치":
        "https://m.subway.co.kr/upload/menu/Pulled-Pork+cheese_20211231095012512.png",
    "로스트 치킨 샌드위치":
        "https://m.subway.co.kr/upload/menu/Roasted-Chicken_20211231095032718.png",
    "로티세리 바비큐 치킨 샌드위치":
        "https://m.subway.co.kr/upload/menu/Rotisserie-Barbecue-Chicken_20211231023137878.png",
    "쉬림프 샌드위치":
        "https://m.subway.co.kr/upload/menu/Shrimp_20211231095411189.png",
    "스파이시 이탈리안 샌드위치":
        "https://m.subway.co.kr/upload/menu/spicy_italian_20211231095435532.png",
    "스테이크 & 치즈 (아메리칸 치즈 포함) 샌드위치":
        "https://m.subway.co.kr/upload/menu/Steak-&-Cheese_20211231095455613.png",
    "써브웨이 클럽 샌드위치":
        "https://m.subway.co.kr/upload/menu/Subway-Club%E2%84%A2_20211231095518589.png",
    "베지 샌드위치":
        "https://m.subway.co.kr/upload/menu/Egg-Mayo_20211231094817112.png",
    "참치 샌드위치":
        "https://m.subway.co.kr/upload/menu/Tuna_20211231095535268.png",
    "터키 샌드위치":
        "https://m.subway.co.kr/upload/menu/Subway-Club%E2%84%A2_20211231095518589.png",
    "터키 베이컨 아보카도 샌드위치":
        "https://m.subway.co.kr/upload/menu/Subway-Club%E2%84%A2_20211231095518589.png",
    "스파이시 쉬림프 샌드위치":
        "https://m.subway.co.kr/upload/menu/Shrimp_20211231095411189.png",
    "스파이시 쉬림프 아보카도 샌드위치":
        "https://m.subway.co.kr/upload/menu/Shrimp_20211231095411189.png",
    "머쉬룸 샌드위치":
        "https://m.subway.co.kr/upload/menu/Pulled-Pork+cheese_20211231095012512.png",
    "치킨 슬라이스 샌드위치":
        "https://m.subway.co.kr/upload/menu/%EC%B9%98%ED%82%A8%EC%8A%AC%EB%9D%BC%EC%9D%B4%EC%8A%A4%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98_20220804012537491.png",
    "치킨 베이컨 아보카도 샌드위치":
        "https://m.subway.co.kr/upload/menu/Rotisserie-Barbecue-Chicken_20211231023137878.png",
    "스파이시 바비큐 샌드위치":
        "https://m.subway.co.kr/upload/menu/%EC%B9%98%ED%82%A8%EB%B2%A0%EC%9D%B4%EC%BB%A8%EC%95%84%EB%B3%B4%EC%B9%B4%EB%8F%84%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98_20220804012954461.png",
    "에그마요 베이컨 샌드위치":
        "https://m.subway.co.kr/upload/menu/Egg-Mayo_20211231094817112.png",
    "에그마요 페퍼로니 샌드위치":
        "https://m.subway.co.kr/upload/menu/Egg-Mayo_20211231094817112.png",
};

const client = new Client({
    user: "postgres",
    host: "skycc.c8pqhjn5wq1m.ap-northeast-2.rds.amazonaws.com",
    database: "skycc",
    password: "postgres",
    port: 5432,
});

// Connect to the database
client
    .connect()
    .then(() => {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                const query = {
                    text: "INSERT INTO picture2 VALUES ($1, $2);",
                    values: [key, value],
                };

                client
                    .query(query)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((e) => console.error(e.stack));
            }
        }
    })
    .catch((e) => console.error(e.stack))
    .finally(() => {
        client.end(); // Close the connection after all queries are executed
    });
