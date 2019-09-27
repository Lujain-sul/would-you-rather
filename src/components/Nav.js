import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { Nav, Navbar, NavItem, Image } from 'react-bootstrap'

class Navigation extends Component {
  state = {
    toHome: false
  }

  Logout = () => {
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
    this.setState((prevState) => ({
      toHome: true
    }))
  }

  render() {
    const { user } = this.props

    if (this.state.toHome) {
      return <Redirect to='/'/>
    }

    return (
        /**
        * react-router-dom and react-bootstrap integration guide from
        *  https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together
        */
      <Navbar>
        <Navbar.Brand as={Link} to='/'>Would you rather</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={Link} to='/add'>New Question</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={Link} to='/leaderboard'>Leader Board</Nav.Link>
            </NavItem>
            <NavItem>
              Hello, {user.name} <Image className='pr-2' style={{ width: '50px'}} src={user.avatarURL} rounded/>
            </NavItem>
            <NavItem>
              <Nav.Link onClick={this.Logout}>Logout</Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(Navigation)
