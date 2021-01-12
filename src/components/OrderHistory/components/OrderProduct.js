import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { updateCart } from '../../../redux/cartReducer'
import {connect} from 'react-redux'

const Product = ({ product, userReducer, updateCart }) => {
  const [fullProduct, setFullProduct] = useState({})
  const [productRetrieved, setProductRetrieved] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      await axios.get(`/api/product/${product.product_id}`)
        .then(res => setFullProduct(res.data[0]))
        .catch(e => console.error(e))
    }
    if (!productRetrieved) {
      getProduct()
      setProductRetrieved(true)
    }
  },[productRetrieved, product])

  const addToCart = () => {
    const {product_id, name} = fullProduct
    const {user_id} = userReducer
    axios.post(`/api/users/${user_id}/cart`, {product_id})
      .then(res => {
        updateCart(res.data)
      })
      .catch(e => console.error(e))
    alert(`${name} added to cart`)
  }

  const { img, name, price } = fullProduct
  return(
    <div className = 'product-container'>
      <img 
        className = 'dash-img' 
        src = {img} 
        alt={name}
      />
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
        <button className = 'buy-button'>Buy Again</button>
        
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { updateCart })(Product)
