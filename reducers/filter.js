import { SHOW_ALL } from '../constants/TodoFilters'
import { SET_FILTER } from '../constants/ActionTypes'

export default function filter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter
    default:
      return state
  }
}
