import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import TodoTextInput from './TodoTextInput'
import { completeTodo, editTodo, deleteTodo } from '../actions'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const {
      todo,
      relatedTodo,
      completeTodo,
      deleteTodo,
    } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)}
        />
      )
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text} {relatedTodo && relatedTodo.isCompleted ? "(+)" : "(-)"}
          </label>
          <button
            className="destroy"
            onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.isCompleted,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  isCompleted: PropTypes.bool,
  isRelatedTodoCompleted: PropTypes.bool,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}

const makeMapStateToProps = (initialState, initialProps) => {
  const { id } = initialProps
  const mapStateToProps = (state) => {
    const { todos } = state
    const todo = todos.byId[id]
    const relatedTodo = todo.relatedId && todos.byId[todo.relatedId]
    return {
      todo,
      relatedTodo
    }
  }
  return mapStateToProps
}

export default connect(
  makeMapStateToProps,
  { completeTodo, editTodo, deleteTodo }
)(TodoItem)
