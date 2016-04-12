import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { completeAll, clearCompleted } from '../actions'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

class MainSection extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderToggleAll() {
    const { completedCount, totalCount, completeAll } = this.props
    if (totalCount > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === totalCount}
               onChange={completeAll} />
      )
    }
  }

  renderFooter() {
    const { totalCount, completedCount } = this.props
    const activeCount = totalCount - completedCount
    if (totalCount) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount} />
      )
    }
  }

  render() {
    const { visibleIds } = this.props
    return (
      <section className="main">
        {this.renderToggleAll()}
        <ul className="todo-list">
          {visibleIds.map(id =>
            <TodoItem key={id} id={id} />
          )}
        </ul>
        {this.renderFooter()}
      </section>
    )
  }
}

const getVisibleTodoIds = createSelector(
  [
    state => state.todos.listedIds,
    state => state.filter,
    state => state.todos.isCompletedById
  ],
  (listedIds, filter, isCompletedById) => {
    switch (filter) {
      case SHOW_ALL:
        return listedIds
      case SHOW_COMPLETED:
        return listedIds.filter(id => isCompletedById[id])
      case SHOW_ACTIVE:
        return listedIds.filter(id => !isCompletedById[id])
    }
  }
)

const getCompletedCount = createSelector(
  [
    state => state.todos.listedIds,
    state => state.todos.isCompletedById
  ],
  (listedIds, isCompletedById) => {
    return listedIds.filter(id => isCompletedById[id]).length
  }
)

function mapStateToProps(state) {
  return {
    visibleIds: getVisibleTodoIds(state),
    completedCount: getCompletedCount(state),
    totalCount: state.todos.listedIds.length,
  }
}

export default connect(
  mapStateToProps,
  { completeAll, clearCompleted }
)(MainSection)
