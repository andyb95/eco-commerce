import React, {Component} from 'react'
import axios from 'axios'
import '../Product/Product.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CartProduct extends Component {


  removeCart = () => {
    const {cart_id} = this.props.product
    
    axios.delete(`/api/users/${cart_id}/cart`)
    this.props.getCart()
    this.props.getTotal()
  }
  
  render(){
    const {name, price, img} = this.props.product
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
            onClick = {() => this.removeCart()}
          >
            <Link className = 'delete-item' to ='/cart'>Delete</Link>
          </button>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(CartProduct)