const initialState = {
  products: []
}

const UPDATE_COUNT = 'UPDATE_COUNT'

export function updateCart(cart) {
  return {
    type: UPDATE_COUNT,
    payload: cart
  }
}

export default function (state = initialState, action) {
  let { type, payload } = action
  switch (type) {
    case UPDATE_COUNT:
      return { ...state,
        products: payload
      }
    default:
      return state
  }
}