

export default function ReadingStyle({state, setState}){

  function wordStyle(){
    setState({
      ...state,
      readingStyle:'word'
    })
  }

  function bookStyle(){
    setState({
      ...state,
      readingStyle:'book'
    })
  }

  return (
    <div className='reading-style'>
      <div className='explanation'>Reading Style</div>
      <div className='buttons'>
        <button className='word' onClick={wordStyle}>word</button>
        <button className='book' onClick={bookStyle}>book</button>
      </div>
    </div>
  )
}