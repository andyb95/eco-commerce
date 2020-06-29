import React, {Component} from 'react'
import axios from 'axios'
import './Product.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { render } from '@testing-library/react'

class Product extends Component {

  constructor(props){
    super(props)
  }
  // componentDidMount(){
    
  // }

  
  addToCart = () => {
    const {product_id} = this.props.product
    const {user_id} = this.props.userReducer
    axios.post(`/api/users/${user_id}/cart`, {product_id})
    // .then(this.props.getCart())
    
  }
  
  render(){
    const {product_id, name, price, img} = this.props.product
    // const {addToCart} = props  
    return(
      <div className = 'product-container'>
        <img className = 'dash-img' src = {img} alt={name}/>
        <div className ='dash-specs'>
          <h1>{name}</h1>
          <h2>${price}</h2>
        </div>
        <div className = 'buy-buttons'>
          <button 
            className = 'buy-button'
            onClick = {() => this.addToCart()}
          >
            <Link to ='/cart' >Add To Cart</Link>
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