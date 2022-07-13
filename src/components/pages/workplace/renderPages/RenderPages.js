
import { useState } from "react"

export default function RenderPages({storage, setStorage, state, setState}){
  const [pageNum, setPageNum]= useState(0)
  if(!storage || !state) return

  const currentFileId=state.currentFileId
  
  let currentFolderId
  for(let i in storage){
    if(currentFileId in storage[i]){
      currentFolderId=i
    }
  }
  if(!currentFileId || !currentFolderId) return

  function onChange(e){
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