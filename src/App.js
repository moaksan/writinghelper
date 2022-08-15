import 'App.css'
import request from './components/api.js'
import MainPage from './components/pages/mainPage/MainPage'
import NotFound from './components/pages/notFound/NotFound'
import Workplace from './components/pages/workplace/Workplace'
import Storage from './components/pages/storage/Storage'
import Signup from './components/pages/signup/Signup'
import Login from './components/pages/login/Login'
import Logout from './components/pages/logout/Logout'
import { initializeUserInfo } from 'components/initialize/InitializeUserInfo'
import { initializeStorage } from 'components/initialize/InitializeStorage'

import {useState, useEffect, useRef} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const initialState={
  isLogin: false,
  userInfo: null,
  currentFileId:null,
  currentFolderId:null,
  selectedFolderFileId:null,
  currentFilePageNum:0,
  currentFilePage:1,
  readingStyle:'word',
  coords: [0,0]
}

function App() {
  const [state, setState]= useState(initialState)
  const [storage, setStorage]= useState()
  
  useEffect(()=>{
    async function fetchUserInfo(){
      await initializeUserInfo({state, setState})
      await initializeStorage({storage, setStorage})
    }
    
    async function handleTabClose(e){
      e.preventDefault()
      sessionStorage.setItem('writinghelper', 'true')
    }
    
    fetchUserInfo()
    window.addEventListener('beforeunload', handleTabClose)
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path='/' element={<MainPage state={state} setState={setState}/>}></Route>
          <Route path='/workplace' element={<Workplace state={state} setState={setState} storage={storage} setStorage={setStorage}/>}></Route>
          <Route path='/storage' element={<Storage state={state} setState={setState} storage={storage} setStorage={setStorage}></Storage>}></Route>
          <Route path='/signup' element={<Signup state={state} setState={setState}/>}></Route>
          <Route path='/login' element={<Login state={state} setState={setState} storage={storage} setStorage={setStorage}/>}></Route>
          <Route path='/logout' element={<Logout state={state} setState={setState} storage={storage} setStorage={setStorage}/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
