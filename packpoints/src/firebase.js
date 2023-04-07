// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9125vyrxyMUjZPQdNYn92S-TpSqhxPU0",
  authDomain: "packpoints-ce44f.firebaseapp.com",
  projectId: "packpoints-ce44f",
  storageBucket: "packpoints-ce44f.appspot.com",
  messagingSenderId: "742918687091",
  appId: "1:742918687091:web:f591c9b1b6c6b8cb8cdd06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ hd: 'nevada.unr.edu' });
export const db = getFirestore(app);
export {auth, provider}