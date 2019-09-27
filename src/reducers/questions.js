import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export default function questions(state={}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
    return {
      ...state,
      ...action.questions
    }

    case ANSWER_QUESTION:
    const { qid, answer } = action

    let chosenOption = answer === 'optionOne'
    ? {
      optionOne: {
        ...state[qid].optionOne,
        votes: state[qid].optionOne.votes.concat([action.authedUser])
      }
    }
    : {
      optionTwo: {
        ...state[qid].optionTwo,
        votes: state[qid].optionTwo.votes.concat([action.authedUser])
      }
    }
    return {
      ...state,
      [qid]: {
        ...state[qid],
        ...chosenOption
      }
    }

    case ADD_QUESTION:
    const { question } = action
    return {
      ...state,
      [question.id]: question,
    }
    default:
    return state
  }
}
