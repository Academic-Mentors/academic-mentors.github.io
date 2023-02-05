from email.message import EmailMessage
import ssl
import smtplib

def send_email(email_receiver, id):
    email_sender = 'packpoints@gmail.com'
    email_password = 'dlisqyetoxsqbeyw'

    # email_receiver = 'clipon@unr.edu'

    subject = f"Pack Points ID for {email_receiver}"
    body = f"""
Hello! This is the PackPoints team and we wanted to congratulate you on earning some PackPoints!

We are rolling out a website for PackPoints so that residents, like yourself, can view how many points you have in comparison to your peers. 

To maintain anonymity, we give each resident a unique id. 

Your unique id is {id}

Continue earning PackPoints by attending study hours with your academic mentors, going to Leadership Council Meetings, attending programs held by your RAs and AMs, and more!

- Pack Points Team
"""

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())
        
    print('Email Sent to: ', email_receiver)

# dlisqyetoxsqbeyw

