
export async function initializeUserInfo({state, setState}){
  let cacheName='writinghelper'
  
  try{
    const cache= await caches.open(cacheName)
    const isLogin= await cache.match('isLogin')

    if(isLogin){
      
      if(await isLogin.json()){
        const userInfo= await (await cache.match('userInfo')).json()
        await setState({
          ...state,
          isLogin:true,
          userInfo: userInfo
        })
      } else{
        await setState({
          ...state,
          isLogin:false,
          userInfo: null
        })
      }
    } else{
      cache.put('isLogin', new Response(false))
      cache.put('userInfo', new Response(null))
      cache.put('data', new Response(null))
    }
  } catch(e){
    console.log(e.message)
  }
}