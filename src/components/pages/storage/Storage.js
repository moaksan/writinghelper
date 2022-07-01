import {useState, useEffect, useRef} from 'react'
import './Storage.css'

import Header from 'components/header/Header'
import RenderFolders from '../workplace/renderFolders/RenderFolders'
import RenderPagesReading from 'components/pages/storage/renderPagesReading/RenderPagesReading'
import ReadingStyle from './readingStyle/ReadingStyle'
import PageSearch from './pageSearch/PageSearch'

export default function Storage({state, setState}){
  const [storage, setStorage]= useState()

  const myRef= useRef(null)

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
          },
          info:{
            blank:[],
            cnt:2
          }
        })
      }
    }
    fetchData()
  }, [state.isLogin])

  

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