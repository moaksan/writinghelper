import 'App.css'
import request from './components/api.js'
import MainPage from './components/pages/mainPage/MainPage'
import NotFound from './components/pages/notFound/NotFound'
import Workplace from './components/pages/workplace/Workplace'
import Signup from './components/pages/signup/Signup'
import Login from './components/pages/login/Login'
import Logout from './components/pages/logout/Logout'
import { initializeUserInfo } from 'components/initialize/InitializeUserInfo'

import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { keyboard } from '@testing-library/user-event/dist/keyboard'
import { readUserData } from 'components/firebase.js'

const initialState={
  isLogin: false,
  userInfo: null,
}

function App() {
  const [state, setState]= useState(initialState)

  useEffect(()=>{
    async function fetchUserInfo(){
      await initializeUserInfo({state, setState})
      
    }
    fetchUserInfo()
  }, [])
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<MainPage state={state} setState={setState}/>}></Route>
          <Route path='/workplace' element={<Workplace state={state} setState={setState}/>}></Route>
          <Route path='/signup' element={<Signup state={state} setState={setState}/>}></Route>
          <Route path='/login' element={<Login state={state} setState={setState}/>}></Route>
          <Route path='/logout' element={<Logout state={state} setState={setState}/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
