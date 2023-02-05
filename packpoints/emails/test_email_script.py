from email_test import send_email
import time

with open('am_emails.txt') as f:
    lines = f.readlines()

prev_emails = {}

for x in lines:
    x = x.replace('\n', '')
    x = x.split(' ')
    x[1] = int(x[1])
    if x[0] not in prev_emails:
        prev_emails[x[0]] = x[1]

# for i in prev_emails:
#     send_email(i, prev_emails[i])
#     time.sleep(1)