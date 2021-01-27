import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import '../../styles/main.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className="background">
        <div className="darker">
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        </div>
      </section>
    );
  }
}

export default LoginRoute
