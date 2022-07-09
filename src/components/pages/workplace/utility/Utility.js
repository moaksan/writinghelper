import { updateUserData } from 'components/firebase'

export default function Utility({state, setState, storage, setStorage}){

  const fileId=state.currentFileId
  let folderId
  for(let i in storage){
    if(storage[i][fileId]){
      folderId=i
    }
  }
  
  async function save(){
    if(fileId==null) return

    const targets= document.querySelectorAll('.writing textarea')
    let content=[]
    for(let i=0; i<targets.length; i++){
      content[i]= targets[i].value
    }
    console.log(content)
    await setStorage({
      ...storage,
      [folderId]:{
        ...storage[folderId],
        [fileId]:{
          ...storage[folderId][fileId],
          content: content
        }
      }
    })
    await updateUserData(state.userInfo.email, folderId, fileId, content)
  }

  return (
    <div className='utility'>
      <div>utility</div>
      <div className='save'><button onClick={save}>저장</button></div>
    </div>
  )
}