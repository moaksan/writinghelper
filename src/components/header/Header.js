import {Link} from 'react-router-dom'
import './Header.css'

export default function Header({state, setState}){
  return (
    <div className='header'>
      <nav className="nav">
        <div className="nav_logo">
          <div><img src={require('assets/edit_FILL0_wght400_GRAD0_opsz48.svg').default} alt='로고'></img></div>
          <Link to='/'><div>WritingHelper</div></Link>
        </div>
        <ul className="nav_menu">
          <Link to='/workplace'><li>작업장</li></Link>
          <Link to='/storage'><li>저장소</li></Link>
        </ul>
        <div className="nav_account">
          {
            state.isLogin
            ? <div className='email'>{state.userInfo.email}</div>
            : ''
          }
          {
            state.isLogin
            ? <Link to='/logout'><div>Log Out</div></Link>
            : <Link to='/login'><div>Log In</div></Link>
          }
          {
            state.isLogin
            ? ''
            : <Link to='/signup'><div>Sign Up</div></Link>
          }
          <div style={{color:'white'}}>Setting</div>
        </div>
      </nav>
    </div>
  )
}