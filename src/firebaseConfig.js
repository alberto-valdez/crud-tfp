
import firebase from 'firebase';
import firebaseStore from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';


var firebaseConfig = {
  
};
  

 const fire = firebase.initializeApp(firebaseConfig);
 const auth = fire.auth()
 const store = firebaseStore.firestore();
 const storage = firebase.storage();


export {auth, store, storage}