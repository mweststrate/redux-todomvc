import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FilterLink from './FilterLink'
import { getCompletedCount, getListedCount } from '../reducers'
import { clearCompleted } from '../actions'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TodoCount = ({ activeCount }) => (
  <span className="todo-count">
    <strong>{activeCount || 'No'}</strong>
    {' '}
    {activeCount === 1 ? 'item' : 'items'} left
  </span>
)

const ClearButton = ({ completedCount, clearCompleted }) => (
  <button className="clear-completed"
          onClick={clearCompleted} >
    Clear completed
  </button>
)

const Footer = ({ filter, completedCount, listedCount, clearCompleted }) => (
  listedCount ? (
    <footer className="footer">
      <TodoCount activeCount={listedCount - completedCount} />
      <ul className="filters">
        {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
          <li key={filter}>
            <FilterLink filter={filter} />
          </li>
        )}
      </ul>
      {completedCount > 0 &&
        <ClearButton
          completedCount={completedCount}
          clearCompleted={clearCompleted}
        />
      }
    </footer>
  ) : (
    <span />
  )
)
Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  listedCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  listedCount: getListedCount(state),
  completedCount: getCompletedCount(state),
})

export default connect(
  mapStateToProps,
  { clearCompleted }
)(Footer)
