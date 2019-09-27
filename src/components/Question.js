import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image } from 'react-bootstrap'

class Question extends Component {
  render() {
    const { question, author } = this.props
    return (
      <Card className='mt-3'>
      <Card.Header>
      <Image style={{ width: '75px'}} src={author.avatarURL} rounded/> {author.name} asks
      </Card.Header>
      <Card.Body>
      <Card.Title>
      Would you rather
      </Card.Title>
      <Card.Text>
      {
        question.optionOne.text.length > 15
        ? `...${question.optionOne.text.substr(0, 14)}...`
        : `...${question.optionOne.text}...`
      }
      </Card.Text>
      <Link to={`/questions/${question.id}`} >View Poll</Link>
      </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id]
  const author = question.author
  return {
    question: question,
    author: users[author]
  }
}

export default connect(mapStateToProps)(Question)
