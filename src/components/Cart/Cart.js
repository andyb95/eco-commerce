import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartProduct from '../CartProduct/CartProduct'

import './Cart.css'


class Cart extends Component{
  constructor(props){
    super(props)
    this.state={
      cart: [],
      total: []
    }
  }

  componentDidMount(){
    this.getCart()
    this.getTotal()
  }

  getCart = () => {
    const {user_id} = this.props.userReducer
    axios.get(`/api/users/${user_id}/cart`)
    .then(res => {
      this.setState({cart: res.data})
    })
    .catch(err => console.log(err))
  }
  
  getTotal = () => {
    const {user_id} = this.props.userReducer
    axios.get(`/api/users/${user_id}/total`)
    .then(res => {
      this.setState({total: res.data[0].sum})
      console.log(this.state.total)
    })
    .catch(err => console.log(err))
  }

  render(){

    return (
      <div className = 'cart'>
        {!this.state.cart[0] ? (
          <h1>Sign in to fill your Cart and help save the Earth.</h1>
        ):(
          <div>
            {this.state.cart.map((e) => {
              return <CartProduct
              key = {e.cart_id}
              product = {e}
              getCart = {this.getCart}
              getTotal = {this.getTotal}
              />
            })}
          <h1>Total: {this.state.total}</h1>
          <button className = 'checkout-button'>
            <Link className = 'home-link-link' to ='/checkout'>Checkout</Link>
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