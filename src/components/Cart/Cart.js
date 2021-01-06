import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartProduct from '../CartProduct/CartProduct'
import './Cart.css'


const Cart = ({ userReducer }) => {
  const { user_id } = userReducer
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState([])
  const [cartRetrieved, setCartRetrieved] = useState(false)

  useEffect(() => {
    const getCart = () => {
      axios.get(`/api/users/${user_id}/cart`)
      .then(res => {
        setCart(res.data)
      })
      .catch(err => console.log(err))
    }
    
    const getTotal = () => {
      axios.get(`/api/users/${user_id}/total`)
      .then(res => {
        setTotal(res.data[0].sum)
      })
      .catch(err => console.log(err))
    }
    if (!cartRetrieved) {
      getCart()
      getTotal()
      setCartRetrieved(true)
    }
  },[cartRetrieved, user_id])

  return (
    <div className = 'cart'>
      {cart[0] ? (
        <div>
          {cart.map((e) => {
            return (
              <CartProduct
                key={e.cart_id}
                product={e}
                setCartRetrieved={setCartRetrieved}
              />
            )
          })}
        <h1>Total: {total}</h1>
        <button className = 'checkout-button'>
          <Link className = 'home-link-link' to ='/checkout'>Checkout</Link>
        </button>
        </div>
      ) : (
        <h1>Sign in to fill your cart</h1>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Cart)