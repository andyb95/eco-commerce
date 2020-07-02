import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import StripeCheckout from 'react-stripe-checkout'
import CartProduct from '../CartProduct/CartProduct'

import "react-toastify/dist/ReactToastify.css"
import './Cart.css'

toast.configure()

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

  handleToken = async(token, addresses) => {
    const {cart} = this.state.cart
    const {price} = this.state.total
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, cart, price }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  render(){

    return (
      <div className = 'cart'>
        {!this.state.cart[0] ? (
          <h1>Fill your Cart and help save the Earth.</h1>
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
          {/* <StripeCheckout
            stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
            token={this.handleToken}
            amount={this.state.total * 100}
            billingAddress 
            shippingAddress = {this.props.userReducer.address}
            /> */}
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