import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import { updateCart } from '../../../../redux/cartReducer'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Checkout = ({ userReducer }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const {user_id} = userReducer
  const [redirecting, setRedirecting] = useState(false)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])
  const [cartRetrieved, setCartRetrieved] = useState(false)

  useEffect(() => {
    const getCart = async () => {
      await axios.get(`/api/users/${user_id}/cart`)
        .then(res => {
          setCart(res.data)
        })
        .catch(e => console.error(e))
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
  },[user_id, cartRetrieved])

  

  const CheckoutForm = async () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
      event.preventDefault()

      const handleCart = () => {
        new Promise(async (resolve, reject) => {
          try {
            const promises = []
            const order_date = new Date().getTime()
            cart.forEach(p => {
              const { user_id, product_id, cart_id } = p
              promises.push(axios.post('/api/order', { user_id, product_id, order_date }))
              promises.push(axios.delete(`/api/users/${cart_id}/cart`))
            })
            const res = await Promise.all(promises)
            return resolve(res)
          } catch (e) {
            return reject(e.toString())
          }
        })
      }

      const amount = await axios.get(`/api/users/${user_id}/total`)
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })

      if (!error){
        const {id} = paymentMethod
        await axios.post(`/pay/${id}/${(amount.data[0].sum.replace(/[$,]+/g,"")*100).toFixed(0)}`)
          .then(handleCart())
          .catch(e => console.log(e))
          .finally(() => setRedirecting(true))
      }
    }

    return (
      <form onSubmit = {handleSubmit} style = {{maxWidth: '400px', margin: '0 auto'}}>
        <h2>Total: {total} </h2>
        <CardElement />
        <button type = 'submit' disabled = {!stripe}>
          Pay
        </button>
      </form>
    )
  }

  return(
    <>
      {redirecting && (<Redirect to = 'success'/>)}
      <Elements stripe = {stripePromise}>
        <CheckoutForm/>
      </Elements>
    </>
  )  
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps, { updateCart })(Checkout)
