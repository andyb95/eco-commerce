import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import UserInfo from './components/UserInfo/UserInfo'
import Cart from './components/Cart/Cart'
import Dash from './components/Dash/Dash'
import Checkout from './components/Checkout/Checkout'

export default (
  <Switch>
    <Route exact path = "/" component = {Home}/>
    <Route path = "/landing" component = {Landing}/>
    <Route path = "/user" component = {UserInfo}/>
    <Route path = "/cart" component = {Cart}/>
    <Route path = "/dash" component = {Dash}/>
    <Route path = '/checkout' component = {Checkout}/>
  </Switch>
)