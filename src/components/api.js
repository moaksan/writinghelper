
export default async function request({url, parameter}){
  console.log(Object.keys(parameter).map(key=> `${key}=${parameter[key]}`).join('&'))
  const fullUrl=`${url}?${Object.keys(parameter).map(key=> `${key}=${parameter[key]}`).join('&')}`

  try{
    const res= await fetch(fullUrl)

    if(!res.ok){
      throw new Error('서버 이상')
    }
    return await res.json()
  } catch(e){
    throw new Error(e.message)
  }
}