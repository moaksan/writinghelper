import React, { useEffect } from 'react'
import { addFolderFileUserData, deleteUserData, renameUserData } from 'components/firebase'
import {useState, useRef} from 'react'

export default function ManipulateFolderFile({state, setState, storage, setStorage}){

  async function addFolderFileButtonClick(e, type){
    let target
    if(state.selectedFolderFileId===null){
      target=document.querySelector(`.list #elwrap0`)
    } else{
      if(storage[state.selectedFolderFileId]){
        target=document.querySelector(`.list #elwrap${state.selectedFolderFileId ? state.selectedFolderFileId : '0'}`)
      } else{
        target=document.querySelector(`.list #el${state.selectedFolderFileId ? state.selectedFolderFileId : '0'}`).parentElement
      }
    }

    if(target.id==='elwrap0'){
      
    } else{
      await setStorage(()=>({
        ...storage,
        [target.parentElement.parentElement.id.slice(6)]:{
          ...storage[target.parentElement.parentElement.id.slice(6)],
          [target.id.slice(6)]:{
            ...storage[target.parentElement.parentElement.id.slice(6)][target.id.slice(6)],
            isOpen:true
          }
        }
      }))
    }

    const tmp=document.createElement('div')
    tmp.classList.add('addBlank')
    tmp.innerHTML=`<form><input type='text'></input></form>`
    tmp.addEventListener('submit', (e)=>addFolderFileButtonSubmit(e, type))
    tmp.querySelector('input').addEventListener('blur', ()=>{tmp.remove()})
    target.appendChild(tmp)
    tmp.querySelector('input').focus()
  }

  async function addFolderFileButtonSubmit(e, type){
    e.preventDefault()
    
    const addblank=document.querySelector(`.list .addBlank`)
    const name=addblank.querySelector('input').value.trim()
    const targetId=addblank.parentElement.id.slice(6)
    addblank.querySelector('input').blur()
    addblank.remove()
    
    let newStorage={...storage}
    const ids= [...storage.info.ids]
    
    let newId=0
    for(let i=0; i<=ids.length ; i++){
      if(ids[i]==null){
        newId=String(i)
        newStorage.info.ids[i]=String(i)
        newStorage.info.cnt+=1
        break
      }
    }
    
    if(type==='folder'){
      newStorage[targetId][newId]={
        id: newId,
        type: 'folder',
        name: name,
        isOpen: true
      }
      newStorage[newId]={}
      setState({
        ...state,
        selectedFolderFileId:newId
      })
    } else{
      newStorage[targetId][newId]={
        id: newId,
        type: 'file',
        name: name,
        content: ''
      }
      setState({
        ...state,
        selectedFolderFileId:newId,
        currentFileId:newId,
        currentFolderId:targetId
      })
    }
    
    if(state.isLogin){
      addFolderFileUserData(state.userInfo.email, targetId, newId, name, ids, type)
    }

    setStorage(newStorage)
    const cache= await caches.open('writinghelper')
    cache.put('/data', new Response(await JSON.stringify({storage:newStorage})))
  }

  async function deleteFolderFileButtonClick(){
    
    if(state.selectedFolderFileId===null) return
    
    let newStorage={...storage}
    let targetId, deleteId=state.selectedFolderFileId, type, cnt=1
    const ids=[...storage.info.ids]

    for(const i in storage){
      if(storage[i][deleteId]!=null){
        targetId=i
      }
    }
    
    if(storage[targetId][deleteId].type==='folder'){
      delete newStorage[targetId][deleteId]
      let q=[deleteId]
      ids[Number(deleteId)]=null
      while(q.length!==0){
        const now=q.shift()
        for(let i in storage[now]){
          if(newStorage[now][i].type==='folder'){
            q.push(i)
          }
          ids[Number(i)]=null
          cnt+=1
        }
        delete newStorage[now]
      }
      
      type='folder'
    } else{
      ids[Number(deleteId)]=null
      delete newStorage[targetId][deleteId]
      type='file'
    }

    newStorage.info.ids=ids
    newStorage.info.cnt-=cnt

    if(state.isLogin){
      await deleteUserData(state.userInfo.email, targetId, deleteId, ids, cnt, type, storage)
    }

    await setState({
      ...state,
      selectedFolderFileId: null,
      currentFileId: null,
      currentFolderId: null
    })
    await setStorage(newStorage)
    
    const cache= await caches.open('writinghelper')
    cache.put('/data', new Response(await JSON.stringify({storage:newStorage})))
  }

  async function renameFolderFileButtonClick(){
    if(state.selectedFolderFileId===null) return

    let folderId, renameId=state.selectedFolderFileId
    
    for(const i in storage){
      if(renameId in storage[i]){
        folderId=i
      }
    }

    let newStorage={...storage}

    let target, targetContent
    if(storage[renameId]){
      target=document.querySelector(`.list #el${renameId} .folder-name`)
      targetContent=target.querySelector('.folder-name-content')
    } else{
      target=document.querySelector(`.list #el${renameId} .file-name`)
      targetContent=target.querySelector('.file-name-content')
    }
    
    targetContent.classList.add('hide')
    const tmp=document.createElement('div')
    tmp.classList.add('addBlank')
    tmp.innerHTML=`<form><input type='text'></input></form>`
    tmp.addEventListener('submit', async (e)=>{
      e.preventDefault()

      const newname=tmp.querySelector('input').value.trim()
      newStorage[folderId][renameId].name= newname
      setStorage(newStorage)

      const cache= await caches.open('writinghelper')
      cache.put('/data', new Response(await JSON.stringify({storage:newStorage})))
      
      if(state.isLogin){
        await renameUserData(state.userInfo.email, folderId, renameId, newname)
      }

      targetContent.classList.remove('hide')
      tmp.querySelector('input').blur()
      tmp.remove()
    })
    tmp.querySelector('input').addEventListener('blur', ()=>{
      tmp.remove()
      targetContent.classList.remove('hide')
    })
    target.appendChild(tmp)
    tmp.querySelector('input').focus()
    
  }

  async function mouseMove(e){
    setState({
      ...state,
      coords:[e.clientX, e.clientY]
    })
  }

  async function manipulateMouseMove(e){
    setName(e.currentTarget.dataset.name)
    hoverName.current.style.left=Math.max(state.coords[0]-hoverName.current.offsetWidth-2,0)+'px'
    hoverName.current.style.top=Math.max(state.coords[1]-hoverName.current.offsetHeight-2,0)+'px'
  }

  async function manipulateMouseOut(e){
    setIsHovering(false)
  }
  async function manipulateMouseOver(e){
    setIsHovering(true)
  }
  const [isHovering, setIsHovering]= useState(false)
  const [name, setName]= useState()
  const hoverName= useRef()

  return (
    <div className='manipulateFolderFile'>
      <div className='buttons' onMouseMove={mouseMove}>
        <div className='img' onClick={(e)=>addFolderFileButtonClick(e, 'file')} onMouseMove={manipulateMouseMove} onMouseOut={manipulateMouseOut} onMouseOver={manipulateMouseOver} data-name='파일 생성'><img src={require('assets/note_add_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img></div>
        <div className='img' onClick={(e)=>addFolderFileButtonClick(e, 'folder')} onMouseMove={manipulateMouseMove} onMouseOut={manipulateMouseOut} onMouseOver={manipulateMouseOver} data-name='폴더 생성'><img src={require('assets/create_new_folder_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img></div>
        <div className='img' onClick={deleteFolderFileButtonClick} onMouseMove={manipulateMouseMove} onMouseOver={manipulateMouseOver} onMouseOut={manipulateMouseOut} data-name='삭제'><img src={require('assets/delete_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img></div>
        <div className='img' onClick={renameFolderFileButtonClick} onMouseMove={manipulateMouseMove} onMouseOut={manipulateMouseOut} onMouseOver={manipulateMouseOver} data-name='이름 바꾸기'><img src={require('assets/pencil.svg').default} alt='로고'></img></div>
      </div>
      <div className='hoverName' ref={hoverName} style={{display: isHovering ? 'block' : 'none'}}>{name}</div>
    </div>
  )
}