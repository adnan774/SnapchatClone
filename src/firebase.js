import firebase from 'firebase';





// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdBxHe_QIN4b3GEfA1-X7WKrhlMgjvJl8",
    authDomain: "snapchat-clone-aap.firebaseapp.com",
    projectId: "snapchat-clone-aap",
    storageBucket: "snapchat-clone-aap.appspot.com",
    messagingSenderId: "771678313771",
    appId: "1:771678313771:web:48a88485cf7fd07da2f96e",
    measurementId: "G-FEW9H7QQ8L"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export { firebaseApp, db, auth, provider, storage };