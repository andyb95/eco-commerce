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
      email: '',
      password: '',
    }
  }
    
  handleChange(prop, val){
    this.setState({
      [prop]: val
    })
  }

  register(){
    axios.post('/auth/register', this.state)
    .then(res => {
      this.props.
      this.props.history.push('/home')
    })
  }

}

export default Landing