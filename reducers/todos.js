import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
import { combineReducers } from 'redux'

let initialById = {}
let initialListedIds = []

const STORE_SIZE = 10000;
for (let i = 0; i < STORE_SIZE; i++) {
  let nextId = 'prefilled-' + i
  initialListedIds.push(nextId)
  initialById[nextId] = {
    text: 'Item' + i,
    id: nextId,
    relatedId: i > 0 ? 'prefilled-' + (i - 1) : null
  };
}

function todo(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text
      }
    case EDIT_TODO:
      return Object.assign({}, state, {
        text: action.text
      })
  }
}

function byId(state = initialById, action) {
  switch (action.type) {
    case ADD_TODO:
    case EDIT_TODO:
      return Object.assign({}, state, {
        [action.id]: todo(state[action.id], action)
      })
    default:
      return state
  }
}

function listedIds(state = initialListedIds, action, {isCompletedById}) {
  switch (action.type) {
    case ADD_TODO:
      return [action.id, ...state]
    case DELETE_TODO:
      return state.filter(todoId => todoId !== action.id)
    case CLEAR_COMPLETED:
      return state.filter(id => !isCompletedById[id])
    default:
      return state
  }
}

function isCompletedById(state = {}, action, {listedIds}) {
  switch (action.type) {
    case COMPLETE_TODO:
      return Object.assign({}, state, {
        [action.id]: !state[action.id]
      })
    case COMPLETE_ALL:
      const areAllCompleted = listedIds.every(id => state[id])
      if (areAllCompleted) {
        return {}
      }
      let nextState = {}
      listedIds.forEach(id => nextState[id] = true)
      return nextState
    default:
       return state
  }
}

export default function todos(state = {}, action) {
  return {
    byId: byId(state.byId, action),
    listedIds: listedIds(state.listedIds, action, state),
    isCompletedById: isCompletedById(state.isCompletedById, action, state)
  }
}
