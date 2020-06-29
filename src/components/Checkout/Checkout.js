import React, {Component} from "react";
import {Link} from 'react-router-dom'
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import {connect } from 'react-redux'

import Cart from '../Cart/Cart'
import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";
import CartProduct from "../CartProduct/CartProduct";

toast.configure();

class Checkout extends Component {

  constructor(props){
    super(props)
    this.state={
      cart: [],
      total: 0
    }
  }

  componentDidMount(){
    this.getCart()
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
      this.setState({total: res.data})
    })
    .catch(err => console.log(err))
  }

  handleToken = async(token, addresses) => {
    const {cart} = this.state.cart
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, cart }
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
      <div className="container">
        <div>
          <h1>1 Shipping address</h1>
          <h2>{this.props.userReducer.address}</h2>
          <Link to = '/user'><button>Change</button></Link>
        </div>
        <div className="cart-checkout">
          {this.state.cart.map((e) => {
            return <CartProduct
              key = {e.cart_id}
              product = {e}
              getCart = {this.getCart}
              />
          })}
        </div>
        <StripeCheckout
          stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
          token={this.handleToken}
          amount={this.state.price * 100}
          billingAddress = {this.props.userReducer.address}
          shippingAddress
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Checkout)












//.env
//package.json(dependencies)