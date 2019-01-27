import firebase from 'firebase/app';
import 'firebase/database';
import firebaseKey from "./apiKey"

const config = {
    apiKey: process.env.firebasekey || firebaseKey.apiKey,
    authDomain: process.env.firebaseauthDomain|| firebaseKey.authDomain,
    databaseURL: process.env.firebasedatabaseURL || firebaseKey.databaseURL,
    projectId: process.env.firebaseprojectId || firebaseKey.projectId,
    storageBucket: process.env.firebasestorageBucket || firebaseKey.storageBucket,
    messagingSenderId: process.env.firebasemessagingSenderId || firebaseKey.messagingSenderId
};

firebase.initializeApp(config);

export default firebase;