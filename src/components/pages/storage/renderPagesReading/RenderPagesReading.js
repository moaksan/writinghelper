
export default function RenderPagesReading({state, setState, storage, setStorage, myRef}){
  if(state.currentFileId==null || storage==null) return

  let target
  for(let i in storage){
    if(storage[i][state.currentFileId]!=null){
      target=i
    }
  }

  console.log(state, storage, target)
  if(state.readingStyle==='word'){
    return (
      <div className="reading word">
        {storage[target][state.currentFileId].content.map((page, idx)=>
          <div key={page} id={`id${idx}`} className='page' >
            <div className="content">{page}</div>
          </div>
        )}
      </div>
    )
  } else if(state.readingStyle==='book'){
    return(
      <div className="reading book">
        <div className="buttons">
          <button className="prev" onClick={()=>{
            setState({
              ...state, 
              currentFilePage: state.currentFilePage>2 ? state.currentFilePage+state.currentFilePage%2-3 : state.currentFilePage})
            }
            }>prev</button>
          <button className="next" onClick={()=>{
            setState({
              ...state,
              currentFilePage: state.currentFilePage<state.currentFilePageNum+state.currentFilePageNum%2-1 ? state.currentFilePage+state.currentFilePage%2+1 : state.currentFilePage})
            }
          }>next</button>
        </div>
        <div className="pages">
          <div className="left-page">{storage[target][state.currentFileId].content[state.currentFilePage+state.currentFilePage%2-2]}</div>
          <div className="right-page">{storage[target][state.currentFileId].content[state.currentFilePage+state.currentFilePage%2-1]}</div>
        </div>
      </div>
    )
  }
}