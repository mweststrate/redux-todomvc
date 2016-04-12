import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import TodoItem from './TodoItem'
import ToggleAll from './ToggleAll'
import Footer from './Footer'
import { getVisibleTodoIds } from '../reducers'

class MainSection extends Component {
  render() {
    const { visibleIds } = this.props
    return (
      <section className="main">
        <ToggleAll />
        <ul className="todo-list">
          {visibleIds.map(id =>
            <TodoItem key={id} id={id} />
          )}
        </ul>
        <Footer />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    visibleIds: getVisibleTodoIds(state),
  }
}

export default connect(
  mapStateToProps
)(MainSection)
