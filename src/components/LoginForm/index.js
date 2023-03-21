import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', submitError: false, errMsg: ''}

  onchangeName = e => {
    this.setState({username: e.target.value})
  }

  onchangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitSucces = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({submitError: true, errMsg})
  }

  renderNameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          value={username}
          onChange={this.onchangeName}
          type="text"
          id="username"
          placeholder="Username"
          className="password-input-field"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="password">
          Passsword
        </label>
        <input
          value={password}
          onChange={this.onchangePassword}
          type="text"
          id="password"
          placeholder="Password"
          className="password-input-field"
        />
      </>
    )
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSucces(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {submitError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-conatiner">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-img"
          />
          <div className="input-container">{this.renderNameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {submitError && <p className="error-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
