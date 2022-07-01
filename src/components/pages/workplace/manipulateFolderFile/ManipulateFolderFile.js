import React, { useEffect } from 'react'
import { writeUserData, deleteUserData } from 'components/firebase'

export default function ManipulateFolderFile({state, setState, storage, setStorage}){

  useEffect(()=>{
    console.log(storage)
  }, [storage])
  async function addFolderFileButtonClick(type){

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
        content: ['']
      }
      setState({
        ...state,
        selectedFolderFileId:newId,
        currentFileId :newId
      })
    }
    
    if(state.isLogin){
      writeUserData(state.userInfo.email, targetId, newId, name, ids, type)
    }

    setStorage(newStorage)
    const cache= await caches.open('writinghelper')
    cache.put('/data', new Response(await JSON.stringify({storage:newStorage})))
  }

  async function deleteFolderFileButtonClick(){
    if(state.selectedFolderFileId===null) return

    let newStorage={...storage}
    let targetId, deleteId, type
    const ids=[...storage.info.ids]

    for(const i in storage){
      if(storage[i][state.selectedFolderFileId]!=null){
        delete newStorage[i][state.selectedFolderFileId]
        newStorage.info.ids[Number(state.selectedFolderFileId)]=null
        newStorage.info.cnt-=1
        setStorage(newStorage)
        targetId=i
        deleteId=state.selectedFolderFileId
      }
    }

    if(storage[state.selectedFolderFileId]!==null){
      delete newStorage[state.selectedFolderFileId]
      setStorage(newStorage)
      type='folder'
    } else{
      type='file'
    }

    setState({
      ...state,
      selectedFolderFileId: null,
      currentFileId: null
    })

    const cache= await caches.open('writinghelper')
    cache.put('/data', new Response(await JSON.stringify({storage:newStorage})))

    if(state.isLogin){
      deleteUserData(state.userInfo.email, targetId, deleteId, ids, type)
    }
  }

  async function renameFolderFileButtonClick(){
    if(state.selectedFolderFileId===null) return
    
    let newStorage={...storage}

    let target, targetContent
    if(storage[state.selectedFolderFileId]){
      target=document.querySelector(`.list #el${state.selectedFolderFileId} .folder-name`)
      targetContent=target.querySelector('.folder-name-content')
    } else{
      target=document.querySelector(`.list #el${state.selectedFolderFileId} .file-name`)
      targetContent=target.querySelector('.file-name-content')
    }
    
    
    targetContent.classList.add('hide')
    const tmp=document.createElement('div')
    tmp.classList.add('addBlank')
    tmp.innerHTML=`<form><input type='text'></input></form>`
    tmp.addEventListener('submit', async (e)=>{
      e.preventDefault()

      const newname=tmp.querySelector('input').value.trim()
      for(const i in storage){
        if(storage[i][state.selectedFolderFileId]!=null){
          newStorage[i][state.selectedFolderFileId].name= newname
          setStorage(newStorage)

          const cache= await caches.open('writinghelper')
          cache.put('/data', new Response(await JSON.stringify({storage:newStorage})))
        }
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

  return (
    <div className='manipulateFolderFile'>
      <div className='buttons'>
        <div className='img' onClick={()=>addFolderFileButtonClick('file')}><img src={require('assets/note_add_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img></div>
        <div className='img' onClick={()=>addFolderFileButtonClick('folder')}><img src={require('assets/create_new_folder_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img></div>
        <div className='img' onClick={deleteFolderFileButtonClick}><img src={require('assets/delete_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img></div>
        <div className='img' onClick={renameFolderFileButtonClick}><img src={require('assets/pencil.svg').default} alt='로고'></img></div>
      </div>
    </div>
  )
}