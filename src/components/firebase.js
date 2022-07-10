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
    const docRef = setDoc(doc(database, "users", email), {
      'storage':{
        '0':{
          '1':{
            id:'1',
            type:'folder',
            name:'빈 폴더',
            isOpen:true
          }
        },
        '1':{
          '2':{
            id:'2',
            type:'file',
            name:'빈 파일',
            content:['']
          }
        },
        info:{
          ids:['0','1','2'],
          cnt:2
        }
      }
    });
  } catch (e) {
    console.error("Error addUser: ", e);
  }
}

export const addFolderFileUserData= async (email, targetId, newId, name, ids, type)=>{
  const key1= `storage.${targetId}.${newId}`
  const key2= `storage.${newId}`
  
  ids[Number(newId)]=newId
  console.log(email, targetId, newId, name, ids)
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

export const deleteUserData= async (email, targetId, deleteId, ids, cnt, type, storage)=>{

  if(type==='folder'){
    const key= `storage.${targetId}.${deleteId}`
    await updateDoc(doc(database, "users", email), {
      [key]: deleteField()
    })

    let q=[deleteId]
    while(q.length!==0){
      const now=q.shift()
      for(let i in storage[now]){
        if(storage[now][i].type==='folder')
          q.push(i)
      }
      const key= `storage.${now}`
      await updateDoc(doc(database, "users", email), {
        [key]: deleteField()
      })
    }
  } else{
    const key= `storage.${targetId}.${deleteId}`
    await updateDoc(doc(database, "users", email), {
      [key]: deleteField()
    })
  }

  await updateDoc(doc(database, "users", email), {
    "storage.info.ids": ids,
    "storage.info.cnt": increment(-cnt)
  })

}

export const renameUserData= async (email, folderId, renameId, newname)=>{
  const key= `storage.${folderId}.${renameId}.name`
  await updateDoc(doc(database, "users", email), {
    [key]: newname
  })
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

export const updateUserData= async (email, folderId, fileId, content)=>{
  const key= `storage.${folderId}.${fileId}.content`
  
  await updateDoc(doc(database, "users", email), {
    [key]: content
  })
}

