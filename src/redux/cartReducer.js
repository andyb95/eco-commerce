const initialState = {
  count: 0
}

const UPDATE_COUNT = 'UPDATE_COUNT'

export function updateCart(count) {
  return {
    type: UPDATE_COUNT,
    payload: count
  }
}

export default function (state = initialState, action) {
  let { type, payload } = action
  switch (type) {
    case UPDATE_COUNT:
      return { ...state,
        count: payload
      }
    default:
      return state
  }
}