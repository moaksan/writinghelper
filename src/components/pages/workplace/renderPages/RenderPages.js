import { map } from "@firebase/util"
import { logoutEmail } from "components/firebase"
import { useEffect, useState, useRef } from "react"

const rows=45, cols=70

export default function RenderPages({storage, setStorage, state, setState}){
  const elRefs=useRef([])
  const [pageNum, setPageNum]= useState(0)
  const [selection, setSelection]= useState([0,0])
  const renderable= storage && state.currentFileId && state.currentFolderId
  const content= renderable ? storage[state.currentFolderId][state.currentFileId].content.map((page, index)=>{
    return ({'id':index, 'page':page})}) : []
  
  useEffect(()=>{
    console.log('pageNum change', pageNum)
    if(elRefs[pageNum]){
      elRefs[pageNum].focus()
    }
  }, [pageNum])
  
  useEffect(()=>{
    console.log('selection change', selection)
    if(elRefs[pageNum]){
      elRefs[pageNum].selectionStart=selection[0]
      elRefs[pageNum].selectionEnd= selection[1]
    }
  }, [selection])
  
  useEffect(()=>{
    console.log('flow')

    if(renderable){
      let i=0
      while(elRefs[i]){
        if(elRefs[i].clientHeight<elRefs[i].scrollHeight){
          pageOverflow(i)
        } else{
          pageUnderflow(i)
        }
        i++
      }
    }
  }, [storage])
  
  async function onClick(e, index){
    setPageNum(index)
    setSelection([elRefs[index].selectionStart, elRefs[index].selectionEnd])
  }
  
  async function onChange(e, index){
    console.log('onChange')
    const newPageNum= index
    const newSelection= [e.target.selectionStart, e.target.selectionEnd]
    
    setStorage({
      ...storage,
      [state.currentFolderId]:{
        ...storage[state.currentFolderId],
        [state.currentFileId]:{
          ...storage[state.currentFolderId][state.currentFileId],
          content: [
            ...storage[state.currentFolderId][state.currentFileId].content.slice(0, index),
            e.target.value,
            ...storage[state.currentFolderId][state.currentFileId].content.slice(index+1)
          ]
        }
      }
    })
    setPageNum(newPageNum)
    setSelection(newSelection)
    
    console.log('onChange finish')
    return
  }
  
  async function pageOverflow(i){
    console.log('overflow')
    
    let tmp1='', tmp2=''
    tmp1= elRefs[i].value.substr(0, elRefs[i].value.length-1)
    tmp2= elRefs[i].value[elRefs[i].value.length-1]
    console.log(i, tmp1, tmp2)
    setStorage({
      ...storage,
      [state.currentFolderId]:{
        ...storage[state.currentFolderId],
        [state.currentFileId]:{
          ...storage[state.currentFolderId][state.currentFileId],
          content: [
            ...storage[state.currentFolderId][state.currentFileId].content.slice(0, i),
            elRefs[i].value.substr(0, elRefs[i].value.length-1),
            storage[state.currentFolderId][state.currentFileId].content[i+1] ? elRefs[i].value[elRefs[i].value.length-1]+storage[state.currentFolderId][state.currentFileId].content[i+1] : elRefs[i].value[elRefs[i].value.length-1],
            ...storage[state.currentFolderId][state.currentFileId].content.slice(i+2)
          ]
        }
      }
    })
    
    if(selection[0] >= elRefs[i].value.length){
      setSelection([selection[0] - elRefs[i].value.length, selection[1]-elRefs[i].value.length])
      setPageNum(pageNum+1)
    } else{
      setSelection([selection[0], selection[1]])
      setPageNum(pageNum)
    }

    console.log('overflow finish')
    return
  }
  
  function pageUnderflow(){
    console.log('underflow')
    console.log('underflow finish')
  }

  function onInput(){
    console.log('oninput')
  }

  return (
    <>
    {
      renderable
      ?<div className="writing">
        {content.map((page, index)=>
        <div className='textarea' key={page.id}>
          <textarea ref={ref=>{elRefs[index]=ref}} placeholder='write here' value={page.page} id={"page"+index} onInput={(e)=>onChange(e, index)} onClick={(e)=>onClick(e, index)} rows={rows} cols={cols}></textarea>
        </div>)}
      </div>
      : <></>
    }
    </>
  )
}