import { user } from "components/firebase"
import { useEffect, useRef, useState } from "react"

export default function RenderPagesReading({state, setState, storage, setStorage, myRef}){
  const renderable= storage && state.currentFileId && state.currentFolderId
  const tmpRef1=useRef()
  const tmpRef2=useRef()
  const wordRef=useRef([])
  const [content, setContent]= useState([])
  let newContent= []
  
  useEffect(()=>{
    console.log('holymoly')
  }, [])

  useEffect(()=>{
    if(renderable){
      const tmpRef= state.readingStyle==='word' ? tmpRef1 : tmpRef2
      tmpRef.current.style.display= 'block'
      tmpRef.current.value=''
      newContent=[]
      let idx=0
      for(let i=0; i<storage[state.currentFolderId][state.currentFileId].content.length; i++){
        const c= storage[state.currentFolderId][state.currentFileId].content[i]
        tmpRef.current.value+= c
        if(tmpRef.current.clientHeight<tmpRef.current.scrollHeight){
          newContent[idx]= {id: idx, page: tmpRef.current.value.substr(0, tmpRef.current.value.length-1)}
          tmpRef.current.value= tmpRef.current.value[tmpRef.current.value.length-1]
          idx+=1
        }
      }
      
      newContent[idx]= {id: idx, page: tmpRef.current.value}
      setContent(newContent)
      tmpRef.current.style.display= 'none'
      
      setState({
        ...state,
        currentFilePageNum: newContent.length
      })
    }
  }, [state.currentFileId, state.readingStyle])
  
  useEffect(()=>{
    if(state.currentFileId && state.currentFilePage && state.readingStyle==='word' && wordRef[0]){
      wordRef[state.currentFilePage-1].scrollIntoView()    
    }
  }, [state.currentFilePage])
  
  if(state.readingStyle==='word'){
    return (
      renderable
      ? <div className="reading word">
        <textarea className="tmpPage words" ref={tmpRef1}></textarea>
        {content.map((page, idx)=>
          <div ref={(p)=>wordRef[idx]=p} key={page.id} id={`id${idx}`} className='page'>
            <div className="number">{page.id+1}</div>
            <textarea className="content" value={page.page} disabled></textarea>
          </div>
        )}
      </div>
      : <></>
    )
  } else if(state.readingStyle==='book'){
    return(
      renderable
      ?<div className="reading book">
        
        <div className="buttons">
          <button className="prev" onClick={()=>{
            setState({
              ...state, 
              currentFilePage: state.currentFilePage>2 ? state.currentFilePage+state.currentFilePage%2-3 : state.currentFilePage})
            }
            }>prev</button>
          <button className="next" onClick={()=>{
            setState({
              ...state,
              currentFilePage: state.currentFilePage<state.currentFilePageNum+state.currentFilePageNum%2-1 ? state.currentFilePage+state.currentFilePage%2+1 : state.currentFilePage})
            }
          }>next</button>
        </div>
        
        <div className="pages">
          <div className="container left">
          <div className="number">{state.currentFilePage+state.currentFilePage%2-1}</div>
          <textarea className="left-page page" value={content[state.currentFilePage+state.currentFilePage%2-2] ? content[state.currentFilePage+state.currentFilePage%2-2].page : ''} disabled></textarea>
          </div>
          <div className="container right">
          <div className="number">{state.currentFilePage+state.currentFilePage%2}</div>
          <textarea className="right-page page" value={content[state.currentFilePage+state.currentFilePage%2-1] ? content[state.currentFilePage+state.currentFilePage%2-1].page : ''} disabled></textarea>
          </div>
        </div>
        
        <textarea className="tmpPage books" ref={tmpRef2}></textarea>
      </div>
      : <></>
    )
  }
}