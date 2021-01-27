import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'
import '../../styles/main.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
        className="registration"
      >
        <p className="registration-label">Sign up</p>
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label className="name-label" htmlFor='fullname'>
            Enter your name<Required />
          </Label>
          <Input
            className="registration-input"
            ref={this.firstInput}
            id='fullname'
            name='name'
            required
          />
        </div>
        <div>
          <Label className="un-label" htmlFor='username'>
            Enter your username<Required />
          </Label>
          <Input
            className="registration-input"
            ref={this.firstInput}
            id='username'
            name='username'
            required
          />
        </div>
        <div>
          <Label className="password-label" htmlFor='password'>
            Enter your password<Required />
          </Label>
          <Input
            className="registration-input"
            id='password'
            name='password'
            required
          />
        </div>
        <div>
          <Label className="confirm-password-label" htmlFor='confirm-password'>
            Confirm your password<Required />
          </Label>
          <Input
            className="registration-input"
            id='confirm-password'
            name='confirm-password'
            type='password'
            required
          />
        </div>
        <footer>
          <Button className="submit" type='submit'>
            Sign up
          </Button>
          {' '}
          <Link className="already-link" to='/login'>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
