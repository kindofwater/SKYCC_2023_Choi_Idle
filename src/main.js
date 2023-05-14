const recommend = require("./algorithm_func");

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
    "SELECT * FROM menu",
      (err, res) => {
        if (err) throw err;
        console.log(res.rows);
        const subways = JSON.parse(res);
        let people = [];

        const rec = recommend.getFoodRecommendation(people, subways);
        let output = [];

        if (rec.num == 1) {
          console.log("*** 메뉴 통일 성공! ***");
          output = [rec.list1, []];
        } else if (rec.num == 2) {
          console.log("*** 2그룹으로 나누어 주문함 ***\n");
          output = [rec.list1, rec.list2];
        } else {
          console.log(
            "*** 아무것도 못먹는 사람이 있거나 2가지 메뉴로 만족할 수 없음 ***"
          );
          output = [[], []];
        }

        const text1 = output[0].map((item) => JSON.stringify(item));
        const text2 = output[0].map((item) => JSON.stringify(item));

        const query = {
          text: "INSERT INTO result VALUES ($1, $2, $3)",
          values: [chn_id, text1, text2],
        };
      };
  })
  .then((res) => {
    console.log(res);
  })
  .catch((e) => console.error(e.stack))
  .finally(() => {
    client.end();
  });
