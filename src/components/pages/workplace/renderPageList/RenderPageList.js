

export default function RenderPageList({storage, state}){
  if(!storage || !state) return
  if(!state.currentFolderId || !state.currentFileId) return
  
  const arr= [0]

  return (
    <div className="pageList">
      {arr.map(page=>
      <div key={page} className="page"></div>)}
    </div>
  )
}