import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUser} from './../../redux/userReducer'

import './Landing.css'

function Landing (props){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const register = (e) => {
    e.preventDefault()
    axios.post('/auth/register', {email, password})
    .then(res => {
      props.updateUser(res.data)
      props.history.push('/')
    })
    .catch(err => {
      alert("Could not register")
    })
  }

  const login = (e) => {
    e.preventDefault()
    axios.post('/auth/login', {email, password})   
    .then(res => {
      props.updateUser(res.data)
      props.history.push('/')
    })
    .catch(err => {
      alert("Could not login")
    })
  }

  return(
    <div className = 'landing'> 
      <h1 className= 'sign-in'>Sign-In</h1>
      <h2>Email</h2>
      <input 
      type="text"
      placeholder = "email..."
      name = "email"
      value ={email}
      onChange = {e => setEmail(e.target.value)}
      required
      />
      <h2>Password</h2>
      <input 
      type="text"
      placeholder = "password..."
      name = "password"
      value = {password}
      onChange = {e => setPassword(e.target.value)}
      required
      />
      <div className ='landing-buttons'>
        <button className = 'landing-button' onClick = {(e) => login(e)}>Login</button>
        <button className = 'landing-button' onClick = {(e) => register(e)}>Register</button>
      </div>
    </div>
  )
}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {updateUser}) (Landing)