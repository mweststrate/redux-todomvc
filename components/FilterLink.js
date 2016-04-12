import React, { Component } from 'react'
import { connect } from 'react-redux'
import shallowCompare from 'react-addons-shallow-compare'
import classnames from 'classnames'
import { setFilter } from '../actions'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilters'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

class FilterLink extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.setFilter(this.props.filter)
  }

  render() {
    const { filter } = this.props
    const title = FILTER_TITLES[filter]
    return (
      <a className={classnames({
        selected: this.props.isSelected
      })}
         style={{ cursor: 'pointer' }}
         onClick={this.handleClick}>
        {title}
      </a>
    )
  }
}

export default connect(
  (state, ownProps) => ({ 
    isSelected: state.filter === ownProps.filter
  }),
  { setFilter }
)(FilterLink)
