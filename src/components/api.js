
export default async function request({word, lang}){
  
  try{
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b744195f13msh446819f5cbb85b5p10c26ejsn8e4ff45530d9',
        'X-RapidAPI-Host': 'word-similarity2.p.rapidapi.com'
      },
      body: `{"word":"${word}","lang":"${lang}","wordnum":10}`
    };

    const res= await fetch('https://word-similarity2.p.rapidapi.com/api/v1/similar-words', options)
      .then(response => response.json())
      .catch(err => console.error(err));
    
    console.log(res)

    return res
  } catch(e){
    throw new Error(e.message)
  }
}

