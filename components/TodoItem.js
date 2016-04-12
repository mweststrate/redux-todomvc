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

  handleDoubleClick() {
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
      isCompleted,
      isRelatedTodoCompleted,
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
            checked={isCompleted}
            onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text} {isRelatedTodoCompleted ? "(+)" : "(-)"}
          </label>
          <button
            className="destroy"
            onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: isCompleted,
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

const mapStateToProps = ({ todos }, { id }) => {
  const todo = todos.byId[id]
  return {
    todo,
    isCompleted: todos.isCompletedById[id],
    isRelatedTodoCompleted: todos.isCompletedById[todo.relatedId]
  }
}

export default connect(
  mapStateToProps,
  { completeTodo, editTodo, deleteTodo }
)(TodoItem)
