import {useNavigate} from 'react-router-dom'
import { logoutEmail } from 'components/firebase'
import { useEffect } from 'react'

export default function Logout({state, setState}){
  const navigate= useNavigate()

  useEffect(()=>{
    logoutEmail()
    .then(async (res)=>{
      setState(()=>{
        return {
          ...state,
          isLogin: false,
          userInfo: null
        }
      })
      const cache= await caches.open('writinghelper')
      caches.delete('writinghelper')
      navigate('/', {replace: true})
    })
  }, [])
  
  return (
    <div className='logout'>
    </div>
  )
}