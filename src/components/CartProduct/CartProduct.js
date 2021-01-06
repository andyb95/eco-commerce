import React from 'react'
import axios from 'axios'
import '../Product/Product.css'
import { updateCart } from '../../redux/cartReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const CartProduct = ({
  updateCart,
  cartReducer,
  product,
  setCartRetrieved
}) => {
  const { name, price, img, cart_id } = product

  const removeCart = () => {
    try {
      axios.delete(`/api/users/${cart_id}/cart`)
        .then(res => updateCart(cartReducer.count-1))
        .then(setCartRetrieved(false))
        .catch(e => console.error(e))
    } catch (e) {
      console.error(e)
    }
  }
  
  return(
    <div className = 'product-container'>
      <img className = 'dash-img' src = {img} alt={name}/>
      <div className ='dash-specs'>
        <h1>{name}</h1>
        <h2>{price}</h2>
      </div>
      <div className = 'buy-buttons'>
        <button className = 'buy-button'>Buy Now</button>
        <button 
          className = 'buy-button'
          onClick = {() => removeCart()}
        >
          <Link className = 'delete-item' to ='/cart'>Remove</Link>
        </button>
        
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { updateCart })(CartProduct)