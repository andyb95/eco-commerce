import axios from 'axios'

const initialState = {
  email: '',
  name: '',
}



export default function (state = initialState, action) {
  let {type, payload} = action
  switch (type){
    default:
      return state
  }
}