// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products hat you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHWmLj-Qbwx6-1RnkroM6Gi23JyLoeetw",
    authDomain: "todo-de105.firebaseapp.com",
    projectId: "todo-de105",
    storageBucket: "todo-de105.appspot.com",
    messagingSenderId: "338287734439",
    appId: "1:338287734439:web:b6136895bf59e801a23582"
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);
export const db = getFirestore(app);