import React from 'react'
import axios from 'axios'
import { updateCart } from '../../redux/cartReducer'
import './Product.css'
import {connect} from 'react-redux'

const Product = props => {
  const { name, price, img } = props.product

  const addToCart = () => {
    const {product_id, name} = props.product
    const {user_id} = props.userReducer
    axios.post(`/api/users/${user_id}/cart`, {product_id})
      .then(res => {
        props.updateCart(res.data)
      })
      .catch(e => console.error(e))
    alert(`${name} added to cart`)
  }
  
  return(
    <div className = 'product-container'>
      <img className = 'dash-img' src = {img} alt={name}/>
      <div className ='dash-specs'>
        <h1>{name}</h1>
        <h2>{price}</h2>
      </div>
      <div className = 'buy-buttons'>
        <button
          className = 'buy-button'
          onClick = {() => addToCart()}
        >
          Add To Cart
        </button>
        <button className = 'buy-button'>Buy Now</button>
        
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { updateCart })(Product)
