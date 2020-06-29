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

toast.configure();

class Checkout extends Component {

  constructor(props){
    super(props)
    this.state={
      product: {
        name: "Tesla Roadster",
        price: 64998.67,
        description: "Cool car"

      }
    }
  }

  handleToken = async(token, addresses) => {
    const {product} = this.state.product
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, product }
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
        <div className="product">
          <Cart />
        </div>
        <StripeCheckout
          stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
          token={this.handleToken}
          amount={this.state.product.price * 100}
          name="Tesla Roadster"
          billingAddress
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