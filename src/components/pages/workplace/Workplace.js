import './Workplace.css'
import { readUserData } from 'components/firebase'
import { useState, useEffect, useRef } from 'react'
import React from 'react'

import Header from 'components/header/Header'
import ManipulateFolderFile from 'components/pages/workplace/manipulateFolderFile/ManipulateFolderFile'
import RenderFolders from 'components/pages/workplace/renderFolders/RenderFolders'
import RenderPages from 'components/pages/workplace/renderPages/RenderPages'
import RenderPageList from 'components/pages/workplace/renderPageList/RenderPageList'
import Utility from 'components/pages/workplace/utility/Utility'

export default function Workplace({state, setState, storage, setStorage}){
  
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
          <RenderPages state={state} setState={setState} storage={storage} setStorage={setStorage} ></RenderPages>
        </div>
        
        <div className='rightside'>
          <Utility state={state} setState={setState} storage={storage} setStorage={setStorage}></Utility>
        </div>
      </section>
    </div>
  )
}