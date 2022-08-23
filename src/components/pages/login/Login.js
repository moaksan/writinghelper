import React, {useState} from 'react'
import { loginEmail, readUserData } from 'components/firebase'
import './Login.css'
import {useNavigate} from 'react-router-dom'
import { setSelectionRange } from '@testing-library/user-event/dist/utils'

export default function Login({state, setState, storage, setStorage}){
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  
  const navigate= useNavigate()
  
  const createUser= (e)=>{
    e.preventDefault()

    loginEmail(email,password)
    .then(async(res)=>{
      
      setState(()=>{
        return {
          ...state,
          isLogin:true,
          userInfo:{
            email: email,
            password: password
          },
          currentFileId:null,
          selectedFolderFileId:null,
          currentFilePageNum:0,
          currentFilePage:1,
          readingStyle:'word'
        }
      })
      
      const cache= await caches.open('writinghelper')
      await cache.put('isLogin', new Response(true))
      await cache.put('userInfo', new Response(JSON.stringify({
        'email':email,
        'password':password
      })))
      await cache.put('data', new Response(await JSON.stringify(await readUserData(email))))
      console.log((await(await cache.match('data')).json()).storage)
      setStorage((await(await cache.match('data')).json()).storage)

      navigate('/', {replace: true})

      return res.user
    })
    .catch(err=>{
      console.log(err.message)
    })
  }
  
  return (
    <div className="login">
      <div className='login-div'>
        <div>Log In</div>
        <form className="login-form" onSubmit={createUser}>
          <div className="email"><input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input></div>
          <div className="password"><input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input></div>
          <div><input type='submit'></input></div>
        </form>
      </div>
    </div>
  )
}