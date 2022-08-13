import { render } from "@testing-library/react"
import { useEffect, useState, useRef } from "react"

let rows=45, cols=70

export default function RenderPages({storage, setStorage, state, setState}){
  const elRefs= useRef()
  const renderable= storage && state.currentFileId && state.currentFolderId
  
  async function onChange(e){
    console.log('onChange')
    setStorage({
      ...storage,
      [state.currentFolderId]:{
        ...storage[state.currentFolderId],
        [state.currentFileId]:{
          ...storage[state.currentFolderId][state.currentFileId],
          content: e.target.value
        }
      }
    })
    console.log('onChange finish')
  }

  useEffect(()=>{
    if(renderable){
      console.log('yes')
      elRefs.current.style.height= '0px'
      elRefs.current.style.height= Math.max(elRefs.current.scrollHeight + 6, 900) + 'px'
    }
  }, [storage, state])
  
  return (
    <>
    {
      renderable
      ? <div className="writing">
        <div className="textarea">
          <textarea ref={elRefs} placeholder='write here' value={storage[state.currentFolderId][state.currentFileId].content} onChange={onChange} cols={cols}></textarea>
        </div>
      </div>
      : <></>
    }
    </>
  )
}