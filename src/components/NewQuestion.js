import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
import { Card, Button } from 'react-bootstrap'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }

  handleChange = (event) => {
    const chosenOption = event.target.name
    const text = event.target.value
    this.setState((prevState) => ({
      ...prevState,
      [chosenOption]: text
    }))
  }

  handleSubmit = (event) => {
    const { dispatch } = this.props
    event.preventDefault()

    if (this.state.optionOne && this.state.optionTwo) {
      dispatch(handleAddQuestion({
        optionOneText: this.state.optionOne,
        optionTwoText: this.state.optionTwo
      }))

      this.setState((prevState) => ({
        optionOne: '',
        optionTwo: '',
        toHome: true
      }))
    }

    else {
      console.log('options can not be empty')
    }
  }

  render() {
    if (this.state.toHome) {
      return <Redirect to='/'/>
    }
    return (
      <Card style={{ position: 'absolute', left: '50%', top: '35%',
        transform: 'translate(-50%, -50%)',
        width: '75%'
      }} className='mt-3'>
      <Card.Header>
        Create New Question
      </Card.Header>
      <Card.Body>
        <Card.Title>
          Would you rather
        </Card.Title>
        <div>
          <input
            className='mt-2'
            style={{ width: '250px' }}
            type='text'
            name='optionOne'
            value={this.state.optionOne}
            placeholder='Option one'
            onChange={this.handleChange}
            />
        </div>
        <div>
          <input
            className='mt-2'
            style={{ width: '250px' }}
            type='text'
            name='optionTwo'
            value={this.state.optionTwo}
            placeholder='Option two'
            onChange={this.handleChange}
            />
        </div>
        <Button className='mt-3' style={{ width: '90px' }} variant='primary' onClick={this.handleSubmit}>Submit</Button>
      </Card.Body>
    </Card>
  )
}
}

export default connect()(NewQuestion)
