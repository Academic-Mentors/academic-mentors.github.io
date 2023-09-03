import requests
import random
import datetime
# from email_test import send_email

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('secret.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection('user_emails').document('data')
doc_points_ref = db.collection('id_data').document('data')
doc_month_ref = db.collection('month_data').document('data')

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

with open('emails.txt', 'r') as email_file:
    # Create a dictionary to store the email and ID pairs
    email_data = {}
    for line in email_file:
        # Split the line into email and ID
        email, idnum = line.strip().split(' ')

        # Add the email and ID to the dictionary
        email_data[email] = idnum
        doc_ref = db.collection('user_emails').document(email)
        doc_ref.set({email: idnum})
email_file.close()

f = open("id_data.txt", 'w')
count = 0
for person in people.keys():
    if (people[person].score >= 400):
        print(people[person].email + " " + str(people[person].score // 400))
        count += 1
    s = str(people[person].sid) + ' ' + str(people[person].score) + ' ' + people[person].hall + '\n'
    f.write(s)
f.close()

try:
    with open('id_data.txt', 'r') as i_file:
        id_data = {}
        for line in i_file:
            stripped = line.strip().split(' ')
            idnum = stripped[0]
            keyval = stripped[1] + ';' + ' '.join(stripped[2:])
            id_data[idnum] = keyval
            doc_points_ref = db.collection('id_data').document(idnum)
            doc_points_ref.set({idnum: keyval})
except Exception as e:
    print(f"An error occurred: {e}")
i_file.close()


current_date = datetime.datetime.now()
current_month = current_date.month

try:
    with open('active_month.txt', 'r') as f:
        lines = f.readlines()
        month = lines[0]
except Exception as e:
    print(f"An error occurred: {e}")
f.close()

if int(current_month) != int(month):
    with open('active_month.txt', 'w') as f:
        f.write(str(current_month))
    f.close()
    with open('id_data.txt', 'r') as month_file:
        id_data = {}
        for line in month_file:
            stripped = line.strip().split(' ')
            idnum = stripped[0]
            keyval = stripped[1] + ';' + ' '.join(stripped[2:])
            id_data[idnum] = keyval
            doc_points_ref = db.collection('month_data').document(idnum)
            doc_points_ref.set({idnum: keyval})
    month_file.close()
