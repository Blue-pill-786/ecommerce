// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage , ref } from "firebase/storage";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1oxtaC9BnqrXhK9r8ihI-59z7EEl-RF8",
  authDomain: "ecommerce-423421.firebaseapp.com",
  projectId: "ecommerce-423421",
  storageBucket: "ecommerce-423421.appspot.com",
  messagingSenderId: "816244126499",
  appId: "1:816244126499:web:c0c4a26aaca3f541bcd296",
  measurementId: "G-EXQE3C48DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app); 
const storage = getStorage(app);
const spaceRef = ref(storage)
const auth = getAuth(app);

export{app, db, storage,spaceRef, auth };