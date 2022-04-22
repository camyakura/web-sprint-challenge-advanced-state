import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const { inputChange, form, postQuiz } = props 

  const onChange = evt => {
    const { id, value } = evt.target
    const newQuestion = {...form, [id]: value}
    inputChange(newQuestion)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz({question_text: form.newQuestion, true_answer_text:form.newTrueAnswer, false_answer_text:form.newFalseAnswer})
  }

  const required = form.newQuestion.trim('').length > 1 && form.newTrueAnswer.trim('').length > 1 && form.newFalseAnswer.trim('').length > 1

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value={form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={form.newFalseAnswer} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={!required}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
