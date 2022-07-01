

export default function RenderPageList({storage, state}){
  if(!storage || !state) return

  for(const i in storage){
    for(const j in storage[i]){
      if(state.currentFileId===j){
        return (
          <div className="pageList">
            {storage[i][j].content.map(page=>
            <div key={page} className="page"></div>)}
          </div>
        )
      }
    }
  }
  
  return 
}