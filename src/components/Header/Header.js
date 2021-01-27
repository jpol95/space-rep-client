import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className="navbar-right">
        <div className="un-nav">
          {this.context.user.name}
        </div>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className="navbar-right">
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/register'>Sign up</Link>
      </div>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link to='/' className="logo">
            Lernen
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
