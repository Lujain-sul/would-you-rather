import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image, CardColumns } from 'react-bootstrap'

class Badge extends Component {
  render() {
    const { user } = this.props
    const answered = Object.keys(user.answers).length
    const asked = user.questions.length
    const score = answered + asked
    return(
      <Card style={{ width: '75%'}} className='mt-2'>
        <Card.Body>
          <CardColumns>
            <Card className='border-right' style={{ border: 'none', width: '12vw'}}>
              <Image className='pr-2' style={{ width: '10vw'}} src={user.avatarURL}/>
            </Card>
            <Card style={{ border: 'none', width: '20vw'}}>
              <Card.Body>
                <h4>{user.name}</h4>
                <h6>Answered questions {answered}</h6>
                <h6>Created questions {asked}</h6>
              </Card.Body>
            </Card>
            <Card style={{ width: '8vw'}}>
              <Card.Header>
                Score
              </Card.Header>
              <Card.Body>
                <span
                  style={{ width: '5vw',
                    height: '5vw',
                    backgroundColor: '#4EBB56',
                    borderRadius: '50%',
                    display: 'inline-block',
                    textAlign: 'center',
                    verticalAlign: 'middle'}}>{score}</span>
                </Card.Body>
              </Card>
            </CardColumns>
          </Card.Body>
        </Card>
      )
    }
  }

  function mapStateToProps(props={},{ user }) {
    return {
      user
    }
  }

  export default connect(mapStateToProps)(Badge)
