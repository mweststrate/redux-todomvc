import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import { PureRenderMixin } from 'pure-render-mixin'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    // MWE: all props are immutable objects. So let's apply pure render mxixin for a big performance gain!
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
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
    /**
     * MWE: "other" is a reference (id of) to an arbitrarily other todo item.
     * In a real app this denotes a reference to something like a user, tags
     * or something else that lives in some other part of the state tree
     */
    const { todo, completeTodo, deleteTodo, other } = this.props

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
                 checked={todo.completed}
                 onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text} {other && other.completed ? "Yes!" : " . "}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}

const relatedTodoSelectorFactory = () => createSelector(
  [
    state => state.todos,
    (_, ownProps) => ownProps.todo.other
  ],
  (todos, otherId) => ({ other: otherId === null ? null : todos[otherId] })
)

const makeMapStateToProps = () => relatedTodoSelectorFactory();

const ConnectedTodoItem = connect(
  makeMapStateToProps
)(TodoItem)

// MWE: export TodoItem for the plain scenario,
// export ConnectedTodoItem for the scenario with 1 selector
// export default TodoItem

export default ConnectedTodoItem
