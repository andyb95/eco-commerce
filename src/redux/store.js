import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({
  userReducer, productReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))