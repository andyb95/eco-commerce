//state: email, password
//handleChange
//login
//register

import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUser} from './../../redux/userReducer'

class Landing extends Component{

  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }
    
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  register(e){
    e.preventDefault()
    const {email, password} = this.state
    debugger
    axios.post('/auth/register', {email, password})
    .then(res => {
      this.props.updateUser(res.data)
      this.props.history.push('/home')
    })
    .catch(err => {
      alert("Could not register")
    })
  }

  login(e){
    e.preventDefault()
    const {email, password} = this.state
    axios.post('/auth/login', {email, password})   
    .then(res => {
      this.props.updateUser(res.data)
      // this.setState({user: res.data})
      this.props.history.push('/home')
      // console.log(this.state)
    })
    .catch(err => {
      alert("Could not login")
    })
  }

  render(){
    const {email, password} = this.state
    return(
      <div>Landing.js
        <input 
        type="text"
        placeholder = "email..."
        name = "email"
        value ={email}
        onChange = {(e)=> this.handleChange(e)}
        />
        <input 
        type="text"
        placeholder = "password..."
        name = "password"
        value = {password}
        onChange = {(e) => this.handleChange(e)}
        />
        <button onClick = {(e) => this.login(e)}>Login</button>
        <button onClick = {(e) => this.register(e)}>Register</button>
      </div>
    )
  }

}
const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {updateUser}) (Landing)