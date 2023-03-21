import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-conatiner">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-img"
        />
      </Link>
      <ul className="ordered-list">
        <li className="list-container">
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li className="list-container">
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogOut}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
