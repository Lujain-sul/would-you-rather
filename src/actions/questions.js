import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}
export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveQuestion({
      author: authedUser,
      ...question
    })
    .then(({question, users}) => {
      dispatch(addQuestion(question))
      dispatch(receiveUsers(users))
    })
    .then(() => dispatch(hideLoading()))
  }
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}
export function handleAnswerQuestion(info) {
  // TODO: undo optimistic updates
  return (dispatch) => {
    dispatch(answerQuestion(info))
    return saveQuestionAnswer(info)
    .then((users) => dispatch(receiveUsers(users)))
    .catch((e) => {
      console.warn('Error in handleAnswerQuestion: ', e)
      alert('There was an error answering the question, try again!')
    })
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
