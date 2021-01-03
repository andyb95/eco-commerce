const initialState = {
  user_id: '',
  name: '',
  email: '',
  password: '',
  address: ''
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(user){
  return {
    type: UPDATE_USER,
    payload: user
  }
}

export function logout(){
  return {
    type: LOGOUT
  }
}

export default function (state = initialState, action) {
  let {type, payload} = action
  switch (type){
    case UPDATE_USER:
      return {...state, 
        user_id: payload.user_id,
        name: payload.name, 
        email: payload.email, 
        password: payload.password,
        address: payload.address
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}