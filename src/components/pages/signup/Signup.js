import React, {useState} from 'react'
import { signupEmail} from 'components/firebase'
import './Signup.css'

export default function Signup(props){
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')

  function createUser(e){
    e.preventDefault()

    signupEmail(email,password)
    .then(res=>{
      window.location.href='/'
    })
  }
  
  return (
    <div className="signup">
      <div className='signup-div'>
        <div>Sign Up</div>
        <form className="signup-form" onSubmit={createUser}>
          <div className="email"><input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input></div>
          <div className="password"><input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input></div>
          <div><input type='submit'></input></div>
        </form>
      </div>
    </div>
  )
}


