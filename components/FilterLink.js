import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { setFilter } from '../actions'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilters'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

const FilterLink = ({ filter, selected, onClick }) => (
  <a className={classnames({ selected })}
     style={{ cursor: 'pointer' }}
     onClick={onClick}>
    {FILTER_TITLES[filter]}
  </a>
)

const mapStateToProps = (state, ownProps) => ({
  selected: state.filter === ownProps.filter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setFilter(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterLink)
