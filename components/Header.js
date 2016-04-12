import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TodoTextInput from './TodoTextInput'
import { addTodo } from '../actions'

const Header = ({ addTodo }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      placeholder="What needs to be done?"
      onSave={text => {
        if (text.length !== 0) {
          addTodo(text)
        }
      }}
    />
  </header>
)
Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default connect(
  null,
  { addTodo }
)(Header)
