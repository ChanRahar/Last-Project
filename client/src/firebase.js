import firebase from 'firebase'
import firebaseKey from "../../firebaseKey"

const config = {
    apiKey: firebaseKey.apiKey,
    authDomain: firebaseKey.authDomain,
    databaseURL: firebaseKey.databaseURL,
    projectId: firebaseKey.projectId,
    storageBucket: firebaseKey.storageBucket,
    messagingSenderId: firebaseKey.messagingSenderId
};

firebase.initializeApp(config);

export default firebase;