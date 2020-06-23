import axios from 'axios'

const initialState = {
  inventory : []
}

const UPDATE_INVENTORY = "UPDATE_INVENTORY"


export function updateInventory(){
  const inventory = axios.get('/api/products')
  .then(res => res.data)
  return {
    type: UPDATE_INVENTORY,
    payload: inventory
  }
}

export default function (state = initialState, action) {
  const {type, payload} = action
  switch (type){
    case UPDATE_INVENTORY + '_FULFILLED':
      return {inventory: payload}
    default:
      return state
  }
}