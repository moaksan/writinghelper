
export async function initializeStorage({storage, setStorage}){
  let cacheName='writinghelper'
  
  try{
    const cache= await caches.open(cacheName)

    const data= await (await cache.match('data')).json()
    console.log('sotrage')
    console.log(data)
    setStorage(data.storage)

  } catch(e){
    console.log(e.message)
  }
}