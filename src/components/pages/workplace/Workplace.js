import Header from 'components/header/Header'
import './Workplace.css'
import { readUserData } from 'components/firebase'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { connectFirestoreEmulator } from 'firebase/firestore'

export default function Workplace({state, setState}){
  
  const [storage, setStorage]= useState()

  useEffect(()=>{
    async function fetchData(){
      if(state.isLogin){
        readUserData(state.userInfo.email)
        const cache= await caches.open('writinghelper')
        setStorage((await(await cache.match('data')).json()).storage)
      } else{
        setStorage({
          children:{
            '빈 폴더':{
              type:'folder',
              id:1,
              isOpen: false,
              children:{
                '파일':{
                  type:'file',
                  id:2,
                  isOpen:false,
                  children:null
                }
              }
            }
          },
          id:0,
          isOpen:false,
          type:'folder',
          count:2
        })
      }
    }
    fetchData()
  }, [state])

  useEffect(()=>{
    console.log(storage, state)
  }, [storage])

  function RenderFolders({data}){
    if(!data) return
    const el=[]
    const elwrap=[]
    elwrap[0]= React.createElement('div', {className: 'total-wrap folder-wrap', id:'id0'}, [])
    const arr=[data]
    
    while(arr.length!==0){
      const now=arr.pop()
      for(let key in now.children){
        arr.push(now.children[key])
        if(now.children[key].type==='folder'){
          elwrap[now.children[key].id]= React.createElement('div',{className:'folder-wrap'}, [])
          el[now.children[key].id]= React.createElement('div', {className:'folder', id:`id${now.children[key].id}`},
          React.createElement('div', {}, key),
          elwrap[now.children[key].id]
          )
          elwrap[now.id].props.children.push(el[now.children[key].id])
          
        } else{
          el[now.children[key].id]= React.createElement('div', {className: 'file', id:`id${now.children[key].id}`},
          React.createElement('div', {}, key),
          )
          elwrap[now.id].props.children.push(el[now.children[key].id])
        }
      }
    }
    console.log(elwrap[0])
    return elwrap[0]
  }

  function RenderPages(){
    
  }

  return (
    <div className="workplace">
      <Header state={state} setState={setState}></Header>
      
      <section className='section'>
        <div className='leftside'>
          <div className='list'>
            <RenderFolders data={storage}></RenderFolders>
          </div>
          <div className='pages'>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
            <div className='page'>
            </div>
          </div>
        </div>

        <div className='middleside'>
          <div className='writing'>
            <form className='form'>
              <div className='textarea'><textarea placeholder='write here'></textarea></div>
              <div className='textarea'><textarea placeholder='write here'></textarea></div>
              <div className='textarea'><textarea placeholder='write here'></textarea></div>
            </form>
          </div>
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