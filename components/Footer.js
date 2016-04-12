import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import FilterLink from './FilterLink'
import { getCompletedCount, getListedCount } from '../reducers'
import { clearCompleted } from '../actions'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

class Footer extends Component {
  renderTodoCount(activeCount) {
    const itemWord = activeCount === 1 ? 'item' : 'items'
    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  renderClearButton() {
    const { completedCount, clearCompleted } = this.props
    if (completedCount > 0) {
      return (
        <button className="clear-completed"
                onClick={clearCompleted} >
          Clear completed
        </button>
      )
    }
  }

  render() {
    const { listedCount, completedCount } = this.props
    const activeCount = listedCount - completedCount
    if (!listedCount) {
      return null
    }
    return (
      <footer className="footer">
        {this.renderTodoCount(activeCount)}
        <ul className="filters">
          {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
            <li key={filter}>
              <FilterLink filter={filter} />
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    )
  }
}

Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  listedCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    listedCount: getListedCount(state),
    completedCount: getCompletedCount(state),
  }
}

export default connect(
  mapStateToProps,
  { clearCompleted }
)(Footer)
