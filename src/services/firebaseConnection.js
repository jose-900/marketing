import firebase from 'firebase/app';
import 'firebase/auth';
import  'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBd2uFGt6Qo8iTloI_mJ_9H2rZs0Gxl9Vk",
    authDomain: "marketing-253fe.firebaseapp.com",
    projectId: "marketing-253fe",
    storageBucket: "marketing-253fe.appspot.com",
    messagingSenderId: "291622650230",
    appId: "1:291622650230:web:43834aec890b51c43cfa57",
    measurementId: "G-GY52J1PW3C"
  };
  
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;