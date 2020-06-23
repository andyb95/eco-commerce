import axios from 'axios'

const initialState = {
  inventory : []
}

const UPDATE_INVENTORY = "UPDATE_INVENTORY"


export function updateInventory(){
  const inv = axios.get('/api/products')
  .then(res => res.data)
  return {
    type: UPDATE_INVENTORY,
    payload: inv
  }
}

export default function (state = initialState, action) {
  const {type, payload} = action
  switch (type){
    case UPDATE_INVENTORY + '_FULFILLED':
      return {...state, payload}
    default:
      return state
  }
}