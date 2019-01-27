import firebase from 'firebase/app';
import 'firebase/database';
// import firebaseKey from "./apiKey"

const config = {
    apiKey: process.env.firebasekey,
    authDomain: process.env.firebaseauthDomain, 
    databaseURL: "https://game-project-6e252.firebaseio.com",  
    projectId: process.env.firebaseprojectId,  
    storageBucket: process.env.firebasestorageBucket,  
    messagingSenderId: process.env.firebasemessagingSenderId  
};

firebase.initializeApp(config);

export default firebase;