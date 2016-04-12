import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getListedCount, getCompletedCount } from '../reducers'
import { completeAll } from '../actions'

class ToggleAll extends Component {
  render() {
    const { completedCount, listedCount, completeAll } = this.props
    if (!listedCount) {
      return null;
    }
    return (
      <input className="toggle-all"
             type="checkbox"
             checked={completedCount === listedCount}
             onChange={completeAll} />
    )
  }
}

function mapStateToProps(state) {
  return {
    listedCount: getListedCount(state),
    completedCount: getCompletedCount(state)
  }
}

export default connect(
  mapStateToProps,
  { completeAll }
)(ToggleAll)
