import firebase from 'firebase/app';
import 'firebase/database';
// import firebaseKey from "./apiKey"

const config = {
    apiKey: process.env.firebasekey,
    authDomain: process.env.firebaseauthDomain, 
    databaseURL: process.env.firebasedatabaseURL,  
    projectId: process.env.firebaseprojectId,  
    storageBucket: process.env.firebasestorageBucket,  
    messagingSenderId: process.env.firebasemessagingSenderId  
};

firebase.initializeApp(config);

export default firebase;