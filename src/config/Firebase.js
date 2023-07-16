import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCxdn84Bqq7c_UjeKWF9HanHbSE3eLg3E0",
    authDomain: "olxsclone.firebaseapp.com",
    databaseURL: "https://olxsclone-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "olxsclone",
    storageBucket: "olxsclone.appspot.com",
    messagingSenderId: "1045392165322",
    appId: "1:1045392165322:web:edf38b8c5c612a464aa733"
  };

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
export const auth = getAuth(app)
export const storage = getStorage(app)