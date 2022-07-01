

export default function RenderPages({storage, state}){
  if(!storage || !state) return
  
  for(const i in storage){
    for(const j in storage[i]){
      if(state.currentFileId===j){

        return (
          <div className="writing">
            <div className="form">
              {storage[i][j].content.map(page=>
              <div key={page} className='textarea'>
                <textarea placeholder='write here' defaultValue={page}></textarea>
              </div>)}
            </div>
          </div>
        )
      }
    }
  }
         
  return 
}