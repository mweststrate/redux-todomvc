import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getListedCount, getCompletedCount } from '../reducers'
import { completeAll } from '../actions'

const ToggleAll = ({ completedCount, listedCount, completeAll }) => (
  listedCount ? (
    <input
      className="toggle-all"
      type="checkbox"
      checked={completedCount === listedCount}
      onChange={completeAll}
    />
  ) : (
    <span />
  )
)

const mapStateToProps = (state) => ({
  listedCount: getListedCount(state),
  completedCount: getCompletedCount(state)
})

export default connect(
  mapStateToProps,
  { completeAll }
)(ToggleAll)
