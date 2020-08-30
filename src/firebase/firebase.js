import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDp5bt13pS6zkLlSeIzRXr3th-k2Hi6n-M",
    authDomain: "movies-a0c44.firebaseapp.com",
    databaseURL: "https://movies-a0c44.firebaseio.com",
    projectId: "movies-a0c44",
    storageBucket: "movies-a0c44.appspot.com",
    messagingSenderId: "1060526259969",
    appId: "1:1060526259969:web:fd1a2b3f38eb8928b46500",
    measurementId: "G-R74GXFH7MK"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {firebase, database as default};