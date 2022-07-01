import {useState, useEffect, useRef} from 'react'

export default function PageSearch({state, setState, myRef}){
  const [input, setInput]= useState(state.currentFilePage)

  function pageNumberSubmit(e){
    e.preventDefault()

    let tmp=input
    if(isNaN(tmp)){
      setInput(state.currentFilePage)
      return
    }
    tmp=Number(tmp)

    if(tmp<1){
      tmp=1
    } else if(tmp>state.currentFilePageNum){
      tmp=state.currentFilePageNum
    }

    setState({
      ...state,
      currentFilePage: tmp
    })
    setInput(tmp)
  }

  useEffect(()=>{
    setInput(state.currentFilePage)
  }, [state.currentFilePage])

  return (
    <div className='page-search'>
      <div className='explanation'>Page Search</div>
      
      <form onSubmit={pageNumberSubmit}>
        <input className='page-number' name='pageNumber' value={input} onChange={(e)=>setInput(e.target.value)}></input>
        <div className='total-pagenum'> / {state.currentFilePageNum}</div>
      </form>
    </div>
  )
}