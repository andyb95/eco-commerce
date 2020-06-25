//state: search
//methods: handleChange, toggleSearch
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {updateUser, logout} from './../../redux/userReducer'
import axios from 'axios'

class Nav extends Component{
  // constructor(props){
  //   super(props)
  // }


  logout = () => {
    axios.delete('auth/logout')
    .then(res => {
      this.props.logout(res.data)
    })
  }


  render(){
    const {name} = this.props.userReducer
    return(
      <div>

        <Link to = '/'>Home</Link>

        <Link to = '/dash'>Products</Link>
        <Link to = '/user'>Account</Link>        


        <input
          type = 'search'
        />
        <button>Search</button>
    
        {name ? (
          <div>
            <Link to = '/user'>Hello, {name}</Link>        
            <button onClick = {this.logout}>
                <Link to = '/landing'>Logout</Link>
            </button>
          </div>
          ):(
            <Link to = '/landing'>Hello, Sign In</Link>
            )}

          <Link to = '/cart'>Cart</Link>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}
 

export default connect(mapStateToProps, {updateUser, logout})(Nav)