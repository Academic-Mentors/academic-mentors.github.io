import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('secret.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection('user_emails').document()
doc_ref.set({
    'name': 'John Doe',
    'email': 'johndoe@example.com'
})