//state: search
//methods: handleChange, toggleSearch
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {updateUser, logout} from './../../redux/userReducer'
import axios from 'axios'
import logo from '../../screenshots/eco-shop.png'
import './Nav.css'


class Nav extends Component{
  

  render(){
    const {name} = this.props.userReducer
    const {email} = this.props.userReducer
    return(
      <div className= 'nav'>

        <Link to = '/'>
            <img src = {logo}
            className= 'home-button'
            />
        </Link>

        <div className = 'search-bar'>
         <input
            className = 'input'
            type = 'search'
          />
          <button className= 'search-button' >
            <img className= 'search-icon' src ='https://www.pngmart.com/files/8/Search-Button-PNG-Image-Free-Download.png'/>
          </button>
        </div>
    
        {name ? (
          <div>
            <Link className = 'hello' to = '/user'>Hello, {name}
            <p className = 'link'>Account</p>
            </Link>        
          </div>
          ): email ? (
            <div>
              <Link className = 'hello' to = '/user'>Hello, {email}
              <p className = 'link'>Account</p>
              </Link>
            </div>
            ):(
            <Link className = 'hello' to = '/landing'>Hello, Sign In</Link>
            )}

          <Link to = '/cart'>
              <img className = 'cart-img' 
              src = 'https://image.flaticon.com/icons/png/512/34/34627.png'/> 
            </Link>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}
 

export default connect(mapStateToProps, {updateUser, logout})(Nav)