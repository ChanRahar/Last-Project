import firebase from 'firebase/app';
import 'firebase/database';
// import firebaseKey from "./apiKey"

const config = {
    apiKey: process.env.firebasekey,
    authDomain: "game-project-6e252.firebaseapp.com",
    databaseURL: "https://game-project-6e252.firebaseio.com",
    projectId: "game-project-6e252",
    storageBucket: "game-project-6e252.appspot.com",
    messagingSenderId: "752115218164"
};

firebase.initializeApp(config);

export default firebase;