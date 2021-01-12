import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Checkout = ({ userReducer, cartReducer }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const [redirecting, setRedirecting] = useState(false)
  const [total, setTotal] = useState(null)

  useEffect(() => {
    const getTotal = () => {
      const {user_id} = userReducer
      axios.get(`/api/users/${user_id}/total`)
      .then(res => {
        setTotal(res.data[0].sum)
      })
      .catch(err => console.log(err))
    }
    if (total === null) {
      getTotal()
    }
  }, [total, userReducer])

  const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
      event.preventDefault()
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })

      if (!error){
        const handleOrder = async (product, orderDate) => {
          const { user_id, product_id, cart_id } = product
          await axios.post('/api/order', { user_id, product_id, orderDate, cart_id })
            .then(res => console.log(res))
            .catch(e => console.error('Orders not sent'))
        }
    
        const handleOrders = async () => {
          const orderDate = new Date().getTime()
          return await Promise.all(
            cartReducer.products.map(p => handleOrder(p, orderDate))
          )
        }
        
        const {id} = paymentMethod
        try {
          await axios.post(`/pay/${id}/${(total.replace(/[$,]+/g,"")*100).toFixed(0)}`)
            .then(res => {
              handleOrders()
                .then(res => setRedirecting(true))
                .catch(err => console.error("Couldn't manage order"))
              console.log(res)
            })
            .catch(e => console.error(e))     
        } catch (error){
          console.log(error)
        }
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

export default connect(mapStateToProps)(Checkout)
