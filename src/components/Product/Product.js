import React, {Component} from 'react'
import axios from 'axios'
import './Product.css'
import {connect} from 'react-redux'

class Product extends Component {


  addToCart = () => {
    const {product_id, name} = this.props.product
    const {user_id} = this.props.userReducer
    axios.post(`/api/users/${user_id}/cart`, {product_id})
    alert(`${name} added to cart`)
  }
  
  render(){
    const { name, price, img } = this.props.product
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
            onClick = {() => this.addToCart()}
          >Add To Cart
            {/* <Link className = 'add-cart' to ='/cart' >Add To Cart</Link> */}
          </button>
          <button className = 'buy-button'>Buy Now</button>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Product)