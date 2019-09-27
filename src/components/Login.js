import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Card, Button } from 'react-bootstrap'
import Select from 'react-select'

class Login extends Component {
  state = {
    id: ''
  }

  handleChange = (option) => {
    this.setState(() => (
      {
        id: option.value
      }
    ))
  }

  Login = () => {
    const { dispatch } = this.props
    this.state.id ? dispatch(setAuthedUser(this.state.id)) : console.log('select a user to login')
  }

  render() {
    const users = this.props.userList
    const options = users.map((user) => (
      {
        value: user.id,
        label: <div><img src={user.avatarURL} style={{width: '30px'}} alt={user.name}/> {' '} {user.name} </div>
      }
    ))

    return (
      <div style={{ position: 'absolute', left: '50%', top: '35%',
        transform: 'translate(-50%, -50%)',
        width: '550px'
      }}>
      <Card>
        <Card.Header className='text-center'>
          <h3>Would you Rather App</h3>
          <small>Please Sign in to continue</small>
        </Card.Header>
        <Card.Body>
          {
            /**
            * select component guide from
            *  https://medium.com/@nidhinkumar/react-select-852e90d549df
            */
          }
          <Select
            options={options}
            onChange={this.handleChange}/>
          <Button className='mt-2' variant='primary' onClick={this.Login}>Sign In</Button>
        </Card.Body>
      </Card>
    </div>
  )
}
}

function mapStateToProps({ users, authedUser }) {
  return {
    userList: Object.keys(users).map((key) => users[key]),
    authedUser
  }
}

export default connect(mapStateToProps)(Login)
