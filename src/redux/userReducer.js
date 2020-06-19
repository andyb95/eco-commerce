import axios from 'axios'

const initialState = {
  email: '',
  name: '',
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(user){
  return {
    type: UPDATE_USER,
    payload: user
  }
}

export default function (state = initialState, action) {
  let {type, payload} = action
  switch (type){
    case UPDATE_USER:
      return {...state, username: payload.username, name: payload.name}
    default:
      return state
  }
}