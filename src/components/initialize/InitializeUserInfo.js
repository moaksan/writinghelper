
export async function initializeUserInfo({state, setState}){
  let cacheName='writinghelper'
  
  try{
    const cache= await caches.open(cacheName)
    const cacheExist= await cache.match('isLogin')
    console.log(cacheExist)
    if(!cacheExist){
      await cache.put('isLogin', new Response(false))
      await cache.put('userInfo', new Response(null))
      await cache.put('data', new Response(JSON.stringify({
        'storage':{
          '0':{
            '1':{
              id:'1',
              type:'folder',
              name:'빈 폴더',
              isOpen:true
            }
          },
          '1':{
            '2':{
              id:'2',
              type:'file',
              name:'빈 파일',
              content:['']
            }
          },
          info:{
            ids:['0','1','2'],
            cnt:2
          }
      }})))
    }
    const isLogin= await (await cache.match('isLogin')).json()
    const userInfo= await (await cache.match('userInfo')).body
    console.log(userInfo)
    setState({
      ...state,
      isLogin: isLogin,
      userInfo: userInfo
    })

  } catch(e){
    console.log(e.message)
  }
}