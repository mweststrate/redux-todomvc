import * as types from '../constants/ActionTypes'

let nextId = 0;
export function addTodo(text) {
  return { type: types.ADD_TODO, text, id: (nextId++).toString() }
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id }
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text }
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}

export function setFilter(filter) {
  return { type: types.SET_FILTER, filter }
}
