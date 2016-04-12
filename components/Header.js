import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import TodoTextInput from './TodoTextInput'
import { addTodo } from '../actions'

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
          <h1>todos</h1>
          <TodoTextInput newTodo
                         onSave={this.handleSave.bind(this)}
                         placeholder="What needs to be done?" />
      </header>
    )
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default connect(null, { addTodo })(Header)
