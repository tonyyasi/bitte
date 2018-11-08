import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAED0iaZ_Ghf_lnly7m7whw9PLjqyOK_FE",
    authDomain: "bitte-ed519.firebaseapp.com",
    databaseURL: "https://bitte-ed519.firebaseio.com",
    projectId: "bitte-ed519",
    storageBucket: "bitte-ed519.appspot.com",
    messagingSenderId: "735689773525"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database();
export const firebaseAuth = firebase.auth;