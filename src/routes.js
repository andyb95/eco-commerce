import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import UserInfo from './components/UserInfo/UserInfo'
import Cart from './components/Cart/Cart'
import Dash from './components/Dash/Dash'
import houseDash from './components/Dash/houseDash'
import applianceDash from './components/Dash/applianceDash'
import Checkout from './components/Stripe/src/components/Checkout'
import Success from './components/Stripe/src/components/Success'
import Canceled from './components/Stripe/src/components/Canceled'

export default (
  <Switch>
    <Route exact path = "/" component = {Home}/>
    <Route path = "/landing" component = {Landing}/>
    <Route path = "/user" component = {UserInfo}/>
    <Route path = "/cart" component = {Cart}/>
    <Route path = "/dash" component = {Dash}/>
    <Route path = "/houseDash" component = {houseDash}/>
    <Route path = "/applianceDash" component = {applianceDash}/>
    <Route path = '/checkout' >
      < Checkout/>
    </Route>
    <Route path = '/success' >
      < Success/>
    </Route>
    <Route path = '/canceled'>
      < Canceled/>
    </Route>
    
  </Switch>
)