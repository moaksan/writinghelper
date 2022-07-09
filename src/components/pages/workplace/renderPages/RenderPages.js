
import { useState } from "react"

export default function RenderPages({storage, setStorage, state}){
  const [pageNum, setPageNum]= useState(0)
  if(!storage || !state || !state.currentFileId) return

  const currentFileId=state.currentFileId
  
  let currentFolderId
  for(let i in storage){
    if(currentFileId in storage[i]){
      currentFolderId=i
    }
  }
  
  function onChange(e){
    console.log(e.target.value)
    const isOverflowing= e.target.clientWidth < e.target.scrollWidth || e.target.clientHeight < e.target.scrollHeight;
    
    if(isOverflowing){
      console.log('overflow')
      
    }
  }


  return (
    <div className="writing">
      <div className="form">
        {storage[currentFolderId][currentFileId].content.map((page, index)=>
        <div key={page} className='textarea'>
          <textarea placeholder='write here' defaultValue={page} id={index} onChange={onChange}></textarea>
        </div>)}
      </div>
    </div>
  )
}