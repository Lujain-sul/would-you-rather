import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tabs, Tab } from 'react-bootstrap'

class Dashboard extends Component {
  render() {
    return (
      <div>
      <Tabs className='mt-3' defaultActiveKey="unanswered" id="uncontrolled-tab-example">
      <Tab eventKey="unanswered" title="Unanswered Questions">
      {
        this.props.unansweredQuestions.map((question) => (
          <Question key={question.id} id={question.id}/>
        ))
      }
      </Tab>
      <Tab eventKey="answered" title="Answered Questions">
      {
        this.props.answeredQuestions.map((question) => (
          <Question key={question.id} id={question.id}/>
        ))
      }
      </Tab>
      </Tabs>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const answered = Object.keys(users[authedUser].answers)
  return {
    answeredQuestions: Object.keys(questions).filter((key) => answered.includes(key)).map((key) => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp),
    unansweredQuestions: Object.keys(questions).filter((key) => !answered.includes(key)).map((key) => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)
