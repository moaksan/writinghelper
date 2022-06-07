// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, getDocs, getDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL_sIC1NwWIP_oLk3oqaT9U_qDk89ExIY",
  authDomain: "writinghelper-97c4d.firebaseapp.com",
  // databaseURL: 'https://writinghelper-97c4d-default-rtdb.firebaseio.com/',
  projectId: "writinghelper-97c4d",
  storageBucket: "writinghelper-97c4d.appspot.com",
  messagingSenderId: "828346297219",
  appId: "1:828346297219:web:c85f7bb794f00d779824b6",
  measurementId: "G-EEFDB0YCKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth= getAuth()
const database= getFirestore(app)

export const signupEmail= (email, password)=>{
  return createUserWithEmailAndPassword(auth, email, password)
}

export const loginEmail= (email, password)=>{
  return signInWithEmailAndPassword(auth, email, password)
}

export const logoutEmail= ()=>{
  return signOut(auth)
}

export const user= ()=>{
  return auth.currentUser
}

export const writeUserData= (email)=>{

}

export const readUserData= async (email)=>{
  if(email==null){
    console.log('email is null')
    return
  } else{
    const snapshot = await getDoc(doc(database, "users", email));
    if (snapshot.exists()) {
      console.log("Document data:", snapshot.data());
      return snapshot.data()
    } else {
      console.log("No such document!");
      return
    }
  }
}

export const addUser= (email)=>{
  try {
    const docRef = addDoc(collection(database, "users"), {
      email: {
        'storage':{
          '빈 폴더':null
        }
      }
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
