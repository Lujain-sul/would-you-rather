import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import Error from './Error'
import { Card, Image, Button, CardColumns, ProgressBar } from 'react-bootstrap'

class Poll extends Component {
  state = {
    chosenOption: ''
  }

  handleChange = (event) => {
    const chosenOption = event.target.value
    this.setState(() => ({
      chosenOption
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { authedUser, question, dispatch } = this.props
    const qid = question.id
    const answer = this.state.chosenOption
    answer ? dispatch(handleAnswerQuestion({authedUser, qid, answer})) : console.log('select a choice')
  }

  render() {
    const { question, author, isAnswered, choice} = this.props

    if (question == null)
    return <Error />

   const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    const optionOnePercentage = (question.optionOne.votes.length / totalVotes) * 100
    const optionTwoPercentage = (question.optionTwo.votes.length / totalVotes) * 100
    return (
      question && (
        isAnswered
        ? <Card style={{ position: 'absolute', left: '50%', top: '35%',
          transform: 'translate(-50%, -50%)',
          width: '75%'
        }} className='mt-3'>
        <Card.Header>
          {author.name} asks
        </Card.Header>
        <Card.Body>
          <CardColumns>
            <Card className='border-right' style={{ border: 'none', width: '250px'}}>
              <Image className='pr-2' style={{ width: '175px'}} src={author.avatarURL} rounded/>
            </Card>
            <Card style={{ border: 'none', width: '275px'}}>
              <h4>Results</h4>
              <Card style={{ width: '350px',
                borderColor: choice === 'optionOne'? '#4EBB56': null,
                backgroundColor: choice === 'optionOne'? '#E2F5E4': 'none',
              }}>
              <Card.Body className='pr-2'>
                <span>Would you rather {question.optionOne.text}?</span>
                <ProgressBar variant="success" now={optionOnePercentage} label={optionOnePercentage}/>
                <span>{`${question.optionOne.votes.length} out of ${totalVotes}`} votes</span>
              </Card.Body>
            </Card>
            <Card style={{ width: '350px',
              borderColor: choice === 'optionTwo'? '#4EBB56': null,
              backgroundColor: choice === 'optionTwo'? '#E2F5E4': 'none',
            }}>
            <Card.Body className='pr-2'>
              <span>Would you rather {question.optionTwo.text}?</span>
              <ProgressBar variant="success" now={optionTwoPercentage} label={optionTwoPercentage}/>
              <span>{`${question.optionTwo.votes.length} out of ${totalVotes}`} votes</span>
            </Card.Body>
          </Card>
        </Card>
      </CardColumns>
    </Card.Body>
  </Card>
  : <Card style={{ position: 'absolute', left: '50%', top: '35%',
    transform: 'translate(-50%, -50%)',
    width: '75%'
  }} className='mt-3'>
  <Card.Header>
    {author.name} asks
  </Card.Header>
  <Card.Body>
    <CardColumns>
      <Card style={{ border: 'none', width: '90px' }}>
        <Image style={{ width: '80px' }} src={author.avatarURL} rounded/>
      </Card>
      <Card style={{ border: 'none', width: '275px'}}>
        <h4>Would you rather...</h4>
        <div>
          <label>
            <input type='radio'
              value='optionOne'
              checked={this.state.chosenOption === 'optionOne'}
              onChange={this.handleChange}
              />
            {` ${question.optionOne.text}`}
          </label>
        </div>
        <div>
          <label>
            <input type='radio'
              value='optionTwo'
              checked={this.state.chosenOption === 'optionTwo'}
              onChange={this.handleChange}
              />
            {` ${question.optionTwo.text}`}
          </label>
        </div>
        <Button style={{ width: '90px' }} variant='primary' onClick={this.handleSubmit}>Submit</Button>
      </Card>
    </CardColumns>
  </Card.Body>
</Card>
)
)
}
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { question_id } = props.match.params
  const question = questions[question_id]
  const author = question ? question.author : ''
  const isAnswered = users[authedUser].answers.hasOwnProperty(question_id)
  const choice = users[authedUser].answers[question_id]
  return {
    authedUser,
    question,
    author: users[author],
    isAnswered,
    choice
  }
}

export default connect(mapStateToProps)(Poll)
