
export async function initializeStorage({storage, setStorage}){
  let cacheName='writinghelper'
  
  try{
    const cache= await caches.open(cacheName)
    const data= await (await cache.match('data')).json()
    
    setStorage(data.storage)
    
  } catch(e){
    console.log(e.message)
  }
}