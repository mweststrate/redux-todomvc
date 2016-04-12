import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import shallowCompare from 'react-addons-shallow-compare'
import classnames from 'classnames'
import FilterLink from './FilterLink'
import { clearCompleted } from '../actions'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

class Footer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderTodoCount() {
    const { activeCount } = this.props
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
    return (
      <footer className="footer">
        {this.renderTodoCount()}
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
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    filter: state.filter
  }
}

export default connect(
  mapStateToProps,
  { clearCompleted }
)(Footer)
