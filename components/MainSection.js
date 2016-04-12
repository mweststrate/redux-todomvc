import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TodoItem from './TodoItem'
import ToggleAll from './ToggleAll'
import Footer from './Footer'
import { getVisibleTodoIds } from '../reducers'

const MainSection = ({ visibleIds }) => (
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

const mapStateToProps = (state) => ({
  visibleIds: getVisibleTodoIds(state)
})

export default connect(
  mapStateToProps
)(MainSection)
