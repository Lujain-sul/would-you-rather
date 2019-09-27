import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion (question) {
  return Promise.all([
    _saveQuestion(question),
    _getUsers()
  ]).then(([question, users]) => ({
    question,
    users,
  }))
}

export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
  .then(() => _getUsers())
  .then((users) => users)
}
