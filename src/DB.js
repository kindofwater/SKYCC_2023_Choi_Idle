import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "skycc.c8pqhjn5wq1m.ap-northeast-2.rds.amazonaws.com",
  database: "skycc",
  password: "postgres",
  port: 5432,
});

client.connect();

export async function checkquery(id) {
  const query = {
    text: "SELECT * FROM users WHERE slack_id = ($1);",
    values: [id],
  };
  const res = await client.query(query);

  if (res.rows.length === 0) {
    return false;
  } else {
    return res.rows[0];
  }
}

export function get_menu(id) {
  const menu = [];
  for (let i = 0; i < 26; i++) {
    const query = {
      text: "SELECT name from menu;",
    };
    client.query(query).then((res) => {
      menu.push(res);
    });
  }
  return menu;
}

export function update_ID_pre(id, preference) {
  const menu = get_menu(id, client);
  for (let j = 0; j < 26; j++) {
    const query = {
      text: "INSERT INTO extra VALUES (&1, &2, &3);",
      values: [id, menu[j], preference[j]],
    };
    client
      .query(query)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.error(e.stack));
  }
}

const url =
  "http://localhost:3000id_1=U05770XJFV5&id_2=U057MS7068J&id_3=U058BEME20Y&id_4=U058BH4EF6U";
const arr = url.split(/[=&]/);
const ID = [];
for (let index in arr) {
  if (index % 2 == 1) {
    ID.push(arr[index]);
  }
}
let k = 0;
for (let idx in ID) {
  if (!checkquery(ID[idx], client)) {
    k = 1;
    break;
  }
}

if (k == 1) {
  // go to /fail(error page)
} else {
  // go to /result (success page)
}

export async function set(id, criticalList) {
  for (let elem in criticalList) {
    const query = {
      text: "INSERT INTO users VALUES ($1, $2);",
      values: [id, elem],
    };

    const res = await client.query(query);
  }
  return true;
}

// checkquery 결과
// Result {
//   command: 'SELECT',
//   rowCount: 0,
//   oid: null,
//   rows: [],
//   fields: [
//     Field {
//       name: 'slack_id',
//       tableID: 16454,
//       columnID: 1,
//       dataTypeID: 1043,
//       dataTypeSize: -1,
//       dataTypeModifier: 54,
//       format: 'text'
//     },
//     Field {
//       name: 'critical',
//       tableID: 16454,
//       columnID: 2,
//       dataTypeID: 1043,
//       dataTypeSize: -1,
//       dataTypeModifier: 24,
//       format: 'text'
//     }
//   ],
//   _parsers: [ [Function: noParse], [Function: noParse] ],
//   _types: TypeOverrides {
//     _types: {
//       getTypeParser: [Function: getTypeParser],
//       setTypeParser: [Function: setTypeParser],
//       arrayParser: [Object],
//       builtins: [Object]
//     },
//     text: {},
//     binary: {}
//   },
//   RowCtor: null,
//   rowAsArray: false
// }
