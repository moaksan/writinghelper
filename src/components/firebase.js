// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, getDoc, setDoc, updateDoc, arrayUnion, increment, deleteField, arrayRemove } from 'firebase/firestore'
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

export const writeUserData= async (email, targetId, newId, name, ids, type)=>{
  const key1= `storage.${targetId}.${newId}`
  const key2= `storage.${newId}`
  
  console.log(key1, key2)
  ids[Number(newId)]=newId

  await updateDoc(doc(database, "users", email), {
    "storage.info.ids": ids,
    "storage.info.cnt": increment(1)
  })

  if(type==='folder'){
    await updateDoc(doc(database, "users", email), {
      [key1]:{
        id: newId,
        type: 'folder',
        name: name,
        isOpen:true
      },
      [key2]:{}
    })
  } else{
    await updateDoc(doc(database, "users", email), {
      [key1]:{
        id: newId,
        type: 'file',
        name: name,
        content: ['']
      }
    })
  }
  
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

export const deleteUserData= async (email, targetId, deleteId, ids, type)=>{
  const key1= `storage.${targetId}.${deleteId}`
  const key2= `storage.${deleteId}`

  ids[Number(deleteId)]=null
  console.log(targetId, deleteId)
  if(type==='folder'){
    await updateDoc(doc(database, "users", email), {
      [key1]: deleteField(),
      [key2]: deleteField(),
      "storage.info.ids": ids,
      "storage.info.cnt": increment(-1)
    })
  } else{
    await updateDoc(doc(database, "users", email), {
      [key1]: deleteField(),
      "storage.info.ids": ids,
      "storage.info.cnt": increment(-1)
    })
  }
}
