import './MainPage.css'
import {Link} from 'react-router-dom'
import Header from 'components/header/Header.js'
import {user} from 'components/firebase'
import { readUserData } from 'components/firebase'

export default function MainPage({state, setState}){
  
  
  return (
    <div className="mainPage">
      <Header state={state} setState={setState}></Header>
    </div>
  )
}