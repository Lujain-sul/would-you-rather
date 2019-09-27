import React, { Component } from 'react'
import { connect } from 'react-redux'
import Badge from './Badge'

class LeaderBoard extends Component {
  render() {
    return(
      <div style={{ position: 'absolute', left: '50%', top: '35%',
        transform: 'translate(-35%, -25%)'
        }}>
        {
          this.props.users.map((user) => (
            <Badge key={user.id} user={user}/>
          ))
        }
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users).map((key) => users[key])
    .sort((a, b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length))
  }
}

export default connect(mapStateToProps)(LeaderBoard)
