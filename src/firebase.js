import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfa2MrrYLxMlo5GOw6Ixq7mkwgv3At0HI",
  authDomain: "crud-react-firestore-3ba6f.firebaseapp.com",
  projectId: "crud-react-firestore-3ba6f",
  storageBucket: "crud-react-firestore-3ba6f.appspot.com",
  messagingSenderId: "43629632816",
  appId: "1:43629632816:web:13c4d5f6620c497e747cf5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}