import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import 'firebase/compat/auth'
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage';
import { getDatabase, ref, update, onValue, get, remove } from 'firebase/database';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FBAPPID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Init services
const auth = getAuth(app);
const realtimeDb = getDatabase(app);
const storage = getStorage(app);

const updateValue = (path, value) => {
    update(ref(realtimeDb, path), value);
}

const deleteValue = async (path) => {
    await remove(ref(realtimeDb, path))
}

export { auth, realtimeDb, getAuth, storage, updateValue, onValue, ref, get, deleteValue };
