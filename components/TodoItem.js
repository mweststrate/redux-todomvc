import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import { connect } from 'react-redux'
import TodoTextInput from './TodoTextInput'
import { completeTodo, editTodo, deleteTodo } from '../actions'

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

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
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={isCompleted}
                 onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text} {isRelatedTodoCompleted ? "Yes!" : " . "}
          </label>
          <button className="destroy"
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

function mapStateToProps(state, ownProps) {
  const todo = state.todos.byId[ownProps.id]
  const isCompleted = state.todos.isCompletedById[ownProps.id]

  let isRelatedTodoCompleted
  if (todo.relatedId != null) {
    isRelatedTodoCompleted = state.todos.isCompletedById[todo.relatedId]
  }

  return {
    todo,
    isCompleted,
    isRelatedTodoCompleted
  };
}

const ConnectedTodoItem = connect(
  mapStateToProps,
  { completeTodo, editTodo, deleteTodo }
)(TodoItem)

export default ConnectedTodoItem
