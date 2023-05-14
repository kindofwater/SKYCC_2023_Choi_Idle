import json
import psycopg2

path = "C:/Users/uitrabook2018/Desktop/sandwich.json"

conn = psycopg2.connect(
    host = "skycc.c8pqhjn5wq1m.ap-northeast-2.rds.amazonaws.com",
    database = "skycc",
    user = "postgres",
    password = "postgres"
)

cur = conn.cursor()

with open(path, "r", encoding='utf-8-sig') as f:
    data = json.load(f)

keys = data.keys()

for key in keys:
    sandwich = data[key]
    critical_list = sandwich["ingredients"]
    sandwich_name = sandwich['name']
    for c in critical_list:
        cur.execute("INSERT INTO menu VALUES ('{}','{}');" .format(sandwich_name, c))

conn.commit()

# 연결을 닫습니다.
cur.close()
conn.close()