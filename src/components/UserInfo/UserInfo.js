import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { updateCart } from './../../redux/cartReducer'
import {updateUser, logout} from './../../redux/userReducer'
import axios from 'axios'
import './UserInfo.css'

class UserInfo extends Component{
  constructor(props){
    super(props)
    this.state ={
      isEditing: false,
      user_id: this.props.userReducer.user_id,
      name: this.props.userReducer.name,
      email: this.props.userReducer.email,
      password: null,
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

  update = (e) => {
    e.preventDefault()
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
    console.log(this.props.userReducer.name)
  }

  logout = () => {
    axios.delete('auth/logout')
    .then(res => {
      this.props.logout(res.data)
      this.props.updateCart([])
    })
  }

  render(){
    const {name, email, password, address} = this.state
    return (
      <div className = 'user-info'>
        <h1 className = 'i-s'>Info & Security</h1>
        {!this.state.isEditing ? (
          <div className = 'info-container'>
            <h2 className = 'sub-t'>Name: </h2>
            <div className = 'info'>{name}</div>
            <h2 className = 'sub-t'>Email: </h2>
            <div className = 'info'>{email}</div>
            <h2 className = 'sub-t'>Password: </h2>
            <div type = 'password' className = 'info'>*****</div>
            <h2 className = 'sub-t'>Address: </h2>
            <div className = 'info'>{address}</div>
            <div className = 'info-buttons'>
              <button 
                className= 'info-button'
                onClick ={this.toggleEdit}>Edit</button>
              <Link to = '/landing'>
                <button 
                  className= 'info-button'
                  onClick = {this.logout}>Logout
                </button>
              </Link>  
            </div>
          </div>
        ):(
          <div className = 'info-container'>
            <h2 className = 'sub-t'>Name:
              <input
              className = 'info-input' 
              type="text"
              name="name"
              value={name}
              onChange= {(e) => this.handleChange(e)}
              />
            </h2>
            <h2 className = 'sub-t'>Email:
              <input
              className = 'info-input' 
              type="text"
              name="email"
              value={email}
              onChange= {(e) => this.handleChange(e)}
              />
            </h2>
            <h2 className = 'sub-t'>Password:
              <input
              className = 'info-input' 
              type="text"
              name="password"
              value={password}
              onChange= {(e) => this.handleChange(e)}
              />
            </h2>
            <h2 className = 'sub-t'>Address:
              <input
              className = 'info-input' 
              type="text"
              name="address"
              value={address}
              onChange= {(e) => this.handleChange(e)}
              />      
            </h2>
            <div className = 'info-buttons'>
              <button className = 'info-button' onClick = {this.update}>Update</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps (state){
  return state
}

export default connect(mapStateToProps, {updateUser, updateCart, logout})(UserInfo)