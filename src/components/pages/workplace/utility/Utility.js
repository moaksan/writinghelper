import { updateUserData } from 'components/firebase'
import { useState } from 'react'
import request from 'components/api'

export default function Utility({state, setState, storage, setStorage}){
  const [similarWordsText, setSimilarWordsText]= useState()
  const [similarWordsResponse, setSimilarWordsResponse]= useState([])

  const fileId=state.currentFileId
  let folderId
  for(let i in storage){
    if(storage[i][fileId]){
      folderId=i
    }
  }
  
  async function save(){
    if(fileId==null) return

    const targets= document.querySelectorAll('.writing textarea')
    let content=[]
    for(let i=0; i<targets.length; i++){
      content[i]= targets[i].value
    }
    
    let newStorage={...storage}
    newStorage[folderId][fileId].content=content

    await setStorage(newStorage)

    const cache= await caches.open('writinghelper')
    cache.put('/data', new Response(await JSON.stringify({storage:newStorage})))

    if(state.isLogin){
      await updateUserData(state.userInfo.email, folderId, fileId, content)
    }
  }

  async function similarWords(e){
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
        <div className='content'>
          <input className='input' onChange={(e)=>setSimilarWordsText(e.target.value)}></input>
          <div className='request'><button onClick={similarWords}>검색</button></div>
        </div>
        <div className='response'>
          {similarWordsResponse}
        </div>
      </div>
    </div>
  )
}