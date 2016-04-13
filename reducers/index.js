import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import todos from './todos'
import filter from './filter'

export default combineReducers({
  todos,
  filter
})

export const getVisibleTodoIds = createSelector(
  [
    state => state.todos.listedIds,
    state => state.todos.byId,
    state => state.filter,
  ],
  (listedIds, byId, filter) => {
    switch (filter) {
      case SHOW_ALL:
        return listedIds
      case SHOW_COMPLETED:
        return listedIds.filter(id => byId[id].isCompleted)
      case SHOW_ACTIVE:
        return listedIds.filter(id => !byId[id].isCompleted)
    }
  }
)

export const getListedCount = createSelector(
  state => state.todos.listedIds,
  ids => ids.length
)

export const getCompletedCount = createSelector(
  [
    state => state.todos.listedIds,
    state => state.todos.byId
  ],
  (listedIds, byId) =>
    listedIds.filter(id => byId[id].isCompleted).length
)
