import React from 'react'


export default function RenderFolders({storage, setStorage, state, setState}){
  if(!storage) return
  
  const arr=['0']
  const el=[]
  const elwrap=[]
  elwrap['0']=<div key={'0'} id={'elwrap0'} className='folder-wrap total-wrap'>{[]}</div>

  while(arr.length!==0){
    const now=arr.pop()
    for(const key in storage[now]){
      arr.push(key)
      if(storage[now][key].type==='folder'){
        elwrap[key]=
        <div key={key} id={'elwrap'+key} className={storage[now][key].isOpen ? 'folder-wrap' : 'folder-wrap hide'}>{[]}</div>
        el[key]=
        <div key={key} id={'el'+key} className='folder'>
          <div className={key===state.selectedFolderFileId ? 'folder-name selected' : 'folder-name'}
          onClick={(e)=>{
            console.log('onclick')
            setStorage({
              ...storage,
              [now]:{
                ...storage[now],
                [key]:{
                  ...storage[now][key],
                  isOpen: !storage[now][key].isOpen
                }
              }
            })
            setState({
              ...state,
              selectedFolderFileId:key,
            })
          }}>
            <div className='isOpenImg'>
            { storage[now][key].isOpen
            ? <img src={require('assets/expand_more_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img>
            : <img src={require('assets/navigate_next_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img>
            }
            </div>
            <div className='folder-name-content'>{storage[now][key].name}</div>
          </div>
          {elwrap[key]}
        </div>
        
        elwrap[now].props.children.push(el[key])
      } else{
        el[key]=
        <div key={key} id={'el'+key} className='file'>
          <div className={storage[now][key].id===state.selectedFolderFileId ? 'file-name selected': 'file-name'}
          onClick={()=>{
            setState({
              ...state,
              selectedFolderFileId:key,
              currentFileId:key,
              currentFolderId: now,
              currentFilePage: state.currentFileId===key ? state.currentFilePage : 1
            })
          }}
          >
            <div className='file-name-content'>{storage[now][key].name}</div>
          </div>
        </div>
        elwrap[now].props.children.push(el[key])
      }
    }
  }
  return(
    <div className='list'>
      {elwrap[0]}
    </div>
  )
}