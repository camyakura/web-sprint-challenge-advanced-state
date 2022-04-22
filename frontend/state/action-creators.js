// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from './action-types'
export function moveClockwise(move) { 
  return { type: MOVE_CLOCKWISE, payload: move }
}

export function moveCounterClockwise(move) { 
  return { type: MOVE_COUNTERCLOCKWISE, payload: move }
}

export function selectAnswer(id) { 
  return { type: SET_SELECTED_ANSWER, payload: id }
}

export function setMessage(message) { 
  return { type: SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(data) { 
  return { type: SET_QUIZ_INTO_STATE, payload: data}
}

export function inputChange(change) { 
  return { type: INPUT_CHANGE, payload: change}
}

export function resetForm() { 
  return { type: RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(null))
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.log(err)
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer({ quiz_id, answer_id }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
      .then(res => {
        dispatch(selectAnswer(null))
        dispatch(setMessage(res.data.message))
        dispatch(fetchQuiz())
      })
      .catch(err => {
        console.log(err)
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz({ question_text, true_answer_text, false_answer_text }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', { question_text, true_answer_text, false_answer_text })
    .then(res => {
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
      dispatch(resetForm())
    })
    .catch(err => {
      console.log(err)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
