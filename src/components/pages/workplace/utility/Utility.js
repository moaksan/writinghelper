import { setUserData } from 'components/firebase'
import { useState } from 'react'
import request from 'components/api'

export default function Utility({state, setState, storage, setStorage}){
  const [similarWordsText, setSimilarWordsText]= useState()
  const [similarWordsResponse, setSimilarWordsResponse]= useState([])
  
  async function save(){
    
    const target= document.querySelector('.writing textarea')
    let newStorage={...storage}
    
    await setStorage(newStorage)
    const cache= await caches.open('writinghelper')
    cache.put('/data', new Response(await JSON.stringify({storage:newStorage})))
    
    if(state.isLogin){
      await setUserData(state.userInfo.email, newStorage)
    }

    alert('저장되었습니다.')
  }

  async function similarWords(e){
    e.preventDefault()

    const word=similarWordsText.trim()
    if(word.length===0) return

    const isAlpha = str => /^[a-zA-Z]*$/.test(str)
    let lang='ko'
    
    if(isAlpha(word[0])){
      lang='en'
    } else{
      lang='ko'
    }
    const res= await request({word, lang})
    
    setSimilarWordsResponse(res.map((item, idx)=>{
      return <div key={idx} className='item'>{idx+1}. {item.name}</div>
    }))
  }
  
  return (
    <div className='utility'>
      <div className='save'>
        <div className='title'>저장</div>
        <div className='content'>
          <button onClick={save}>저장</button>
        </div>
      </div>
      <div className='similarWords'>
        <div className='title'>관련어 찾기</div>
        <form className='content' onSubmit={similarWords}>
          <input className='input' onChange={(e)=>setSimilarWordsText(e.target.value)}></input>
          <div className='request'><button onClick={similarWords}>검색</button></div>
        </form>
        <div className='response'>
          {similarWordsResponse}
        </div>
      </div>
    </div>
  )
}