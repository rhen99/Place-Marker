import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyA_VZu2XBHQTISwg0CcSnvNcMsIQfM6gzc",
    authDomain: "place-marker-7164c.firebaseapp.com",
    projectId: "place-marker-7164c",
    storageBucket: "place-marker-7164c.appspot.com",
    messagingSenderId: "263944255003",
    appId: "1:263944255003:web:f598a6cf0f8d988e552abe",
    measurementId: "G-N5MKW2VQC4"
}
const app = firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();
const auth = app.auth();
const storage = app.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();



export {firestore, firebase, auth, googleProvider, facebookProvider, storage};