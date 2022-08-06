
export default function RenderPagesReading({state, setState, storage, setStorage, myRef}){
  const renderable= storage && state.currentFileId && state.currentFolderId
  let content=[]

  if(renderable){
    content=storage[state.currentFolderId][state.currentFileId].content.map((page, index)=>{
      return {'id':index, 'page':page}})
  }

  if(state.readingStyle==='word'){
    return (
      renderable
      ?<div className="reading word">
        {content.map((page, idx)=>
          <div key={page.id} id={`id${idx}`} className='page' >
            <div className="content">{page.page}</div>
          </div>
        )}
      </div>
      : <></>
    )
  } else if(state.readingStyle==='book'){
    return(
      renderable
      ?<div className="reading book">
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
          <div className="left-page">{content[state.currentFilePage+state.currentFilePage%2-2]}</div>
          <div className="right-page">{content[state.currentFilePage+state.currentFilePage%2-1]}</div>
        </div>
      </div>
      : <></>
    )
  }
}