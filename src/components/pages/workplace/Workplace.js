import './Workplace.css'
import { readUserData } from 'components/firebase'
import { useState, useEffect, useRef } from 'react'
import React from 'react'

import Header from 'components/header/Header'
import ManipulateFolderFile from 'components/pages/workplace/manipulateFolderFile/ManipulateFolderFile'
import RenderFolders from 'components/pages/workplace/renderFolders/RenderFolders'
import RenderPages from 'components/pages/workplace/renderPages/RenderPages'
import RenderPageList from 'components/pages/workplace/renderPageList/RenderPageList'

export default function Workplace({state, setState}){
  
  const [storage, setStorage]= useState()

  useEffect(()=>{
    async function fetchData(){
      if(state.isLogin){
        const cache= await caches.open('writinghelper')
        setStorage((await(await cache.match('data')).json()).storage)
      } else{
        setStorage({
          0:{
            1:{
              id:'1',
              type:'folder',
              name:'빈 폴더'
            }
          },
          1:{
            2:{
              id:'2',
              type:'file',
              name:'빈 파일',
              content:['']
            }
          }
        })
      }
    }
    console.log('rerender')
    fetchData()
  }, [state.isLogin])
  

  return (
    <div className="workplace">
      <Header state={state} setState={setState}></Header>
      
      <section className='section'>
        <div className='leftside'>
          <ManipulateFolderFile state={state} setState={setState} storage={storage} setStorage={setStorage}></ManipulateFolderFile>

          <RenderFolders storage={storage} setStorage={setStorage} state={state} setState={setState}></RenderFolders>

          <RenderPageList storage={storage} state={state}></RenderPageList>
        </div>

        <div className='middleside'>
          <RenderPages storage={storage} state={state}></RenderPages>
        </div>

        <div className='rightside'>
          <div className='utility'>
            utility
            <div className='submit'><input type='submit' value='저장'></input></div>
          </div>
        </div>
      </section>
    </div>
  )
}