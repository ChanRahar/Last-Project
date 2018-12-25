import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAVO_YeE_DAMUF3iTJC7qc_OXjF4tc3Qes",
    authDomain: "game-project-6e252.firebaseapp.com",
    databaseURL: "https://game-project-6e252.firebaseio.com",
    projectId: "game-project-6e252",
    storageBucket: "game-project-6e252.appspot.com",
    messagingSenderId: "752115218164"
};

firebase.initializeApp(config);

export default firebase;