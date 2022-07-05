import {useNavigate} from 'react-router-dom'
import { logoutEmail } from 'components/firebase'
import { useEffect } from 'react'

export default function Logout({state, setState, storage, setStorage}){
  const navigate= useNavigate()

  useEffect(()=>{
    logoutEmail()
    .then(async (res)=>{
      const cache= await caches.open('writinghelper')

      await cache.put('isLogin', new Response(false))
      await cache.put('userInfo', new Response(null))
      await cache.put('data', new Response(JSON.stringify({
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
      })))

      setState(()=>{
        return {
          ...state,
          isLogin: false,
          userInfo: null,
          currentFileId:null,
          selectedFolderFileId:null,
          currentFilePageNum:0,
          currentFilePage:1,
          readingStyle:'word'
        }
      })
      console.log(await(await cache.match('data')).json())
      setStorage((await(await cache.match('data')).json()).storage)

      navigate('/', {replace: true})
    })
  }, [])
  
  return (
    <div className='logout'>
    </div>
  )
}