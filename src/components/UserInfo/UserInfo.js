import React, {Component} from 'react'
import { connect } from 'react-redux'

import {updateUser} from './../../redux/userReducer'
import axios from 'axios'

class UserInfo extends Component{
  constructor(props){
    super(props)
    this.state ={
      isEditing: false,
      user_id: this.props.userReducer.user_id,
      name: this.props.userReducer.name,
      email: this.props.userReducer.email,
      password: this.props.userReducer.password,
      address: this.props.userReducer.address
    }
  }

  toggleEdit= () => {
    this.setState({isEditing: !this.state.isEditing})
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  update = () => {
    const {user_id, name, email, password, address} = this.state
    console.log(user_id, name, email, password, address)
    if (user_id){
      const user = {
        name, email, password, address
      }
      axios.put(`/auth/edit/${user_id}`, user)
      .then(res => {
        this.props.updateUser(res.data)
      })
    } 
    this.toggleEdit()
  }

  render(){
    const {name, email, password, address} = this.state
    return (
      <div>
        <h1>Info & Security</h1>
        {!this.state.isEditing ? (
          <div>
            <div>Name: {name}</div>
            <div>Email: {email}</div>
            <div>Password: {password}</div>
            <div>Address: {address}</div>
            <button onClick ={this.toggleEdit}>Update</button>
          </div>
        ):(
          <div>
            <div>Name:
              <input 
              type="text"
              name="name"
              value={name}
              onChange= {(e) => this.handleChange(e)}
              />
            </div>
            <div>Email:
              <input 
              type="text"
              name="email"
              value={email}
              onChange= {(e) => this.handleChange(e)}
              />
            </div>
            <div>Password:
              <input 
              type="text"
              name="password"
              value={password}
              onChange= {(e) => this.handleChange(e)}
              />
            </div>
            <div>Address:
              <input 
              type="text"
              name="address"
              value={address}
              onChange= {(e) => this.handleChange(e)}
              />      
            </div>
            <button onClick = {this.update}>Save Changes</button>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps (state){
  return state
}

export default connect(mapStateToProps, {updateUser})(UserInfo)