import firebase from "firebase";
import "firebase/firestore";
const firebaseconfig = {
  apiKey: "AIzaSyDXol3-5aTTybOHPYeEDKR12rYywYTGtiU",
  authDomain: "voice2text-development.firebaseapp.com",
  projectId: "voice2text-development",
  storageBucket: "voice2text-development.appspot.com",
  messagingSenderId: "248417028570",
  appId: "1:248417028570:web:38d76ae4463c4c57be98e3",
};

firebase.initializeApp(firebaseconfig);
export const db = firebase.firestore();
 export {firebase}