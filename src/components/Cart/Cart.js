import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartProduct from '../CartProduct/CartProduct'
import Checkout from '../Checkout/Checkout'
import './Cart.css'

class Cart extends Component{
  constructor(props){
    super(props)
    this.state={
      cart: []
    }
  }

  componentWillMount(){
    this.getCart()
    console.log(this.state.cart)
  }

  getCart = () => {
    const {user_id} = this.props.userReducer
    axios.get(`/api/users/${user_id}/cart`)
    .then(res => {
      this.setState({cart: res.data})
    })
    .catch(err => console.log(err))
  }
  

  
  // addToCart = (product_id) => {
  //   const {user_id} = this.props.userReducer
  //   const product = axios.post(`/api/users/${user_id}/cart`, {product_id})
  //   .then(res => {
  //     this.setState({...this.state.cart, product})
  //   })
  //   this.getCart()
  // }

  render(){
    return (
      <div>
        {!this.state.cart[0] ? (
          <h1>Fill your Cart and help save the Earth.</h1>
        ):(
          <div className = 'cart'>
            {this.state.cart.map((e) => {
              return <CartProduct
              key = {e.cart_id}
              product = {e}
              getCart = {this.getCart}
              // addToCart = {this.addToCart}
              />
            })}
            <button className = 'checkout-button'>
              <Link className = 'to-checkout' to = "/checkout">Checkout</Link>
            </button>
          </div>
        )}
      
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Cart)