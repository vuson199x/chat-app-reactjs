import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth"; // xác thực authen
import "firebase/firestore"; // realtime database

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAITM0H5wGg5sC8YWgO5HV6a8USuLw5oq0",
    authDomain: "chat-app-reactjs-3ca3e.firebaseapp.com",
    projectId: "chat-app-reactjs-3ca3e",
    storageBucket: "chat-app-reactjs-3ca3e.appspot.com",
    messagingSenderId: "516544447577",
    appId: "1: 516544447577: web: 18f2539e83354c60d01d48",
    measurementId: "G-B1STT4BXMZ",
  })
  .auth();

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const auth = firebase.auth();
const db = firebase.firestore();

// Setup firebase trên localhost
// auth.useEmulator("http://localhost:9099");
// if (window.location.hostname === "localhost") {
//   db.useEmulator("localhost", "8080");
// }
export { db };
// export default firebase;
