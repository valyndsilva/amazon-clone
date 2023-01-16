// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu5OnCb9b9IORzixII6yS4QAHaDi_04RE",
  authDomain: "clone-3ae4b.firebaseapp.com",
  projectId: "clone-3ae4b",
  storageBucket: "clone-3ae4b.appspot.com",
  messagingSenderId: "504696714564",
  appId: "1:504696714564:web:2a8919273e98414391d311",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
