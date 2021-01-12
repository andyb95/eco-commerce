import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import logo from '../../screenshots/eco-shop.png'
import './Nav.css'

const Nav = (props) => {
  const { name, email } = props.userReducer
  const { products } = props.cartReducer

  return(
    <div className= 'nav'>
      <Link to = '/'>
        <img src = {logo}
          className= 'home-button'
          alt='logo'
        />
      </Link>
      <div className = 'search-bar'>
        <input
          className = 'input'
          type = 'search'
        />
        <button className= 'search-button' >
          <img className= 'search-icon' src ='https://www.pngmart.com/files/8/Search-Button-PNG-Image-Free-Download.png' alt='searchIcon'/>
        </button>
      </div>
  
      {name ? (
        <div>
          <Link className='hello' to='/user'>Hello, {name}
            <p className='link'>Account</p>
          </Link>
          <Link className='orderHistory' to='/orderHistory'>
            <p className='link'>Order History</p>
          </Link>
        </div>
      ) : email ? (
        <div>
          <Link className = 'hello' to = '/user'>Hello, {email}
            <p className = 'link'>Account</p>
          </Link>
          <Link className='orderHistory' to='/orderHistory'>
            <p className='link'>Order History</p>
          </Link>
        </div>
      ):(
        <Link className = 'hello' to = '/landing'>Hello, Sign In</Link>
      )}
      <Link to = '/cart'>
        <img 
          className = 'cart-img' 
          src = 'https://image.flaticon.com/icons/png/512/34/34627.png'
          alt='cart'
        />
        {products[0] ? (
          <div className='count'>{products.length}</div>
        ) : null}
      </Link>
    </div>
  )
}

function mapStateToProps(state){
  return state
}
 
export default connect(mapStateToProps)(Nav)
