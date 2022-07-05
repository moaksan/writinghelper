import {useState, useEffect, useRef} from 'react'
import './Storage.css'

import Header from 'components/header/Header'
import RenderFolders from '../workplace/renderFolders/RenderFolders'
import RenderPagesReading from 'components/pages/storage/renderPagesReading/RenderPagesReading'
import ReadingStyle from './readingStyle/ReadingStyle'
import PageSearch from './pageSearch/PageSearch'

export default function Storage({state, setState, storage, setStorage}){

  const myRef= useRef(null)

  

  return (
    <div className='storage'>
      <Header state={state} setState={setState}></Header>

      <div className='section'>
        <div className='leftside'>
          <RenderFolders storage={storage} setStorage={setStorage} state={state} setState={setState}></RenderFolders>
        </div>

        <div className='middleside'>
          <RenderPagesReading state={state} setState={setState} storage={storage} setStorage={setStorage} myRef={myRef}></RenderPagesReading>
        </div>

        <div className='rightside'>
          <ReadingStyle state={state} setState={setState} myRef={myRef}></ReadingStyle>
          <PageSearch state={state} setState={setState} myRef={myRef}></PageSearch>
        </div>
      </div>
    </div>
  )
}