import requests
import random
from email_test import send_email

class Resident:
    def __init__(self, name, email, score, hall, sid):
        self.name = name
        self.email = email
        self.score = score
        self.hall = hall
        self.sid = sid

url = "https://script.google.com/macros/s/AKfycbx3EYsAmGUp3nql4gkRvcuGOTSaVL1ZO3UuNvTioxskYtY3UCcOML-_v_0mfLVJSlQ8/exec"

payload={}
headers = {'Accept': 'application/json'}

response = requests.request("GET", url, headers=headers, data=payload)

data = response.json()['GoogleSheetData']

emails = set()
people = {}

prev_emails = {}

with open('emails.txt') as f:
    lines = f.readlines()

for x in lines:
    x = x.replace('\n', '')
    x = x.split(' ')
    x[1] = int(x[1])
    if x[0] not in prev_emails:
        prev_emails[x[0]] = x[1]

for i in range(len(data)):
    for j in range(len(data[i])):
        if data[i][j][1] != 'Email Address':
            if data[i][j][1] in emails:
                people[data[i][j][1]].score += int(data[i][j][2])
            else:
                emails.add(data[i][j][1])
                people[data[i][j][1]] = Resident(data[i][j][3], data[i][j][1], int(data[i][j][2]), data[i][j][4], '1')

for i in people.keys():
    if people[i].email in prev_emails.keys():
        people[i].sid = prev_emails[people[i].email]
    else:
        people[i].sid = random.choice(range(1,1000000))
        f = open("emails.txt", "a")
        s = people[i].email + " " + str(people[i].sid) + "\n"
        print(s)
        f.write(s)
    print(people[i].name, people[i].email, people[i].score, people[i].hall, people[i].sid)
