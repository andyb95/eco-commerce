import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  userReducer, productReducer, cartReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))