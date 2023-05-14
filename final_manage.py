import re
from slack_bolt import App
from slack_sdk import WebClient
from slack_bolt.adapter.socket_mode import SocketModeHandler
import psycopg2
import json
bot_token = 'xoxb-5283266346448-5283497478032-w5XzE8WtKSX2MGTvEkcFRdsI'
app_token = 'xapp-1-A057MP2C78S-5283475529632-68d77ccca5915fb49d70fdf43f80960eb01912522dcdaf8d89c0e67083c628fa'
app = App(token=bot_token)
slack_client = WebClient(token = bot_token)
robot_id = 'U058BEME20Y'
true = True
false = False
cur_recommend_list = dict()
is_recommend = list()
cur_rec_state = dict()
cur_idx = dict()
@app.event("app_mention")
def who_am_i(event, client, message, say):
    print("event:", event)
    print("client:", client)
    print("message", message)
    say(f'hello! <@{event["user"]}>')
    text = event['text']
    channel = event['channel']
    response = slack_client.conversations_members(channel = channel)
    channel = event['channel']
    member_ids = response["members"]
    print("Participant IDs:")
    for member_id in member_ids:
        print(member_id)
    say(f'{member_id}\n')

def get_request(channel, say):
    global cur_rec_state,cur_recommend_list,cur_idx
    print("test")
    conn = psycopg2.connect(host = "skycc.c8pqhjn5wq1m.ap-northeast-2.rds.amazonaws.com",
    dbname = "practice", user = "postgres", password = "postgres")
    conn.set_client_encoding('utf-8')
    cur = conn.cursor()
    cur.execute("SELECT * FROM result5;")
    rows = cur.fetchall()
    dl1 = rows[0][0]
    dl2 = rows[0][1]
    lst1 = list()
    lst2 = list()
    print("HHII", channel)
    for itm in dl1:
        t_d = json.loads(itm)
    lst1.append(t_d['name'])
    for itm in dl2:
        t_d = json.loads(itm)
    lst2.append(t_d['name'])
    print(lst1)
    print(lst2)
    cur_rec_state[channel] = 0
    if len(lst1)==0:
        cur_rec_state[channel] = 0
        cur_recommend_list[channel] = list()
    else:
        if len(lst2) == 0:
            cur_rec_state[channel] = 1
            cur_recommend_list[channel] = lst1
        else:
            cur_rec_state[channel] = 2
            cur_recommend_list[channel] = [lst1, lst2]
    cur_idx[channel] = 0
def process_command(text, channel,say):
    global cur_rec_state, cur_recommend_list, cur_idx
    print("Hi:",text)
    if channel in cur_recommend_list:
        if text != "Yes" and text != "No":
            say("Wrong Answer, Try again.")
            return
    if text == "Recommend":
        cur_url = "http://localhost:3000?"
        cur_url+="channel_id="+channel+"&"
        response = slack_client.conversations_members(channel = channel)
        member_ids = response["members"]
        member_ids.remove(robot_id)
        cur_url+="num="+'{0:04d}'.format(len(member_ids))+"&"
        for i in range(0,len(member_ids)):
            cur_url+="id_{0}=".format(i+1)
            cur_url+=member_ids[i]
            if(i<len(member_ids)-1):
                cur_url+="&"
        say("Check my recommendation at the following link\n")
        say(cur_url)
        print("Recommend Command executed")
        is_recommend.append(channel)
    if text == "Share":
        print(is_recommend)
        if not(channel in is_recommend):
            say("Not recommended. Try recommend first.")
            return
        get_request(channel, say)
        if cur_rec_state[channel] == 0:
            say("Unfortunately, there are no appopriate suggesstions for you.\n We will try to do better next time")
            return
        elif cur_rec_state[channel] == 1:
            say("You have a single menu suggestion.")
            say("Do you like this? (Yes/No)")
            say(cur_recommend_list[channel][cur_idx[channel]])
        elif cur_rec_state[channel] == 2:
            say("Since some of you have critical issues, I suggest two menus")
            say("Do you like these? (Yes/No)")
            out_str1 = "For non-critical : "+cur_recommend_list[channel][cur_idx[channel]]
            out_str2 = "For critical : "+cur_recommend_list[channel][cur_idx[channel]]
            say(out_str1)
            say(out_str2)
        if text == "Yes":
            try:
                if cur_rec_state[channel] == 1:
                    say("This is my final recommendation.")
                    say(cur_recommend_list[channel][cur_idx[channel]])
                elif cur_rec_state[channel] == 2:
                    say("These are our final suggentions.")
                    out_str1 = "For non-critical : "+cur_recommend_list[channel][cur_idx[channel]]
                    out_str2 = "For critical : "+cur_recommend_list[channel][cur_idx[channel]]
                    say(out_str1)
                    say(out_str2)
                    say("Have a nice meal.")
                if channel in cur_recommend_list:
                    del cur_recommend_list[channel]
                if channel in cur_idx:
                    del cur_idx[channel]
                if channel in is_recommend:
                    is_recommend.remove(channel)
            except:
                say("Too many reject ToT\nTry Recommand one more time!")
                if channel in cur_idx_list:
                    del cur_idx[channel]
                if channel in cur_recommend_list:
                    del cur_recommend_list[channel]
                if channel in is_recommend:
                    is_recommend.remove(channel)
                if text == "No":
                    try:
                        cur_idx[channel] += 1
                        if cur_rec_state[channel] == 1:
                            say("This is my next recommendation.")
                            say(cur_recommend_list[channel][cur_idx[channel]])
                            say("Do you want this? (Yes/No)")
                        elif cur_rec_state[channel] == 2:
                            say("These are my next recommendation.")
                            out_str1 = "For non-critical : "+cur_recommend_list[channel][cur_idx[channel]]
                            out_str2 = "For critical : "+cur_recommend_list[channel][cur_idx[channel]]
                            say(out_str1)
                            say(out_str2)
                            say("Do you want these? (Yes/No)")
                    except:
                        say("Too many reject ToT\nTry Recommand one more time!")
                        if channel in cur_recommend_list:
                            del cur_recommend_list[channel]
                        if channel in cur_idx:
                            del cur_idx[channel]
                        if channel in is_recommend:
                            is_recommend.remove(channel)
@app.event("message")
def handle_message(event, say):
    text = event['text']
    channel = event['channel']
    command_text = ""
    print(text)
    if text.startswith("Recommend"):
        command_text = "Recommend"
    if text.startswith("Share"):
        command_text = "Share"
    if text.startswith("Yes"):
        command_text = "Yes"
    if text.startswith("No"):
        command_text = "No"
    print(command_text)
    process_command(command_text, channel, say)

SocketModeHandler(app, app_token).start()