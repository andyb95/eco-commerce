import React, {Component} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

// import '../css/global.css'
// import '../css/normalize.css'

class Checkout extends Component{

  constructor(props){
    super(props)
    this.state={
      redirecting: false,
      total: []
    }
  }

  componentDidMount(){
    this.getTotal()
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

  CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    
    
    const handleSubmit = async (event) => {
      event.preventDefault()
      const user = await axios.get('/auth/getUser')
      const amount = await axios.get(`/api/users/${user.data.user_id}/total`)
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })

      if (!error){

        const {id} = paymentMethod
        try {
          console.log((amount.data[0].sum.replace(/[$,]+/g,"")*100).toFixed(0))
          await axios.post(`/pay/${id}/${(amount.data[0].sum.replace(/[$,]+/g,"")*100).toFixed(0)}`)
          // const {data} = await axios.post(`/pay/${id}/${(amount.data[0].sum.replace(/[$,]+/g,"")*100).toFixed(0)}`)
          this.setState({redirecting: true})          
          
        } catch (error){
          console.log(error)
        }
      }
    }

    return (
      <form onSubmit = {handleSubmit} style = {{maxWidth: '400px', margin: '0 auto'}}>
        <h2>Total: {this.state.total} </h2>
        <CardElement />
        <button type = 'submit' disabled = {!stripe}>
          Pay
        </button>
      </form>
    )
  }

  
  render(){
    const CheckoutForm = this.CheckoutForm
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    return(
      <>
      {this.state.redirecting && (<Redirect to = 'success'/>)}
      <Elements stripe = {stripePromise}>
        <CheckoutForm/>
      </Elements>
      </>
    )  
  }
  
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Checkout)



// const formatPrice = ({ amount, currency, quantity }) => {
//   const numberFormat = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency,
//     currencyDisplay: 'symbol',
//   });
//   const parts = numberFormat.formatToParts(amount);
//   let zeroDecimalCurrency = true;
//   for (let part of parts) {
//     if (part.type === 'decimal') {
//       zeroDecimalCurrency = false;
//     }
//   }
//   amount = zeroDecimalCurrency ? amount : amount / 100;
//   const total = (quantity * amount).toFixed(2);
//   return numberFormat.format(total);
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {
//         ...state,
//         quantity: state.quantity + 1,
//         price: formatPrice({
//           amount: state.basePrice,
//           currency: state.currency,
//           quantity: state.quantity + 1,
//         }),
//       };
//     case 'decrement':
//       return {
//         ...state,
//         quantity: state.quantity - 1,
//         price: formatPrice({
//           amount: state.basePrice,
//           currency: state.currency,
//           quantity: state.quantity - 1,
//         }),
//       };
//     case 'setLoading':
//       return { ...state, loading: action.payload.loading };
//     case 'setError':
//       return { ...state, error: action.payload.error };
//     default:
//       throw new Error();
//   }
// }

// const Checkout = () => {
//   const [state, dispatch] = useReducer(reducer, {
//     priceId: process.env.REACT_APP_PRICE_ID,
//     basePrice: process.env.REACT_APP_BASE_PRICE,
//     currency: process.env.REACT_APP_CURRENCY,
//     quantity: 1,
//     price: formatPrice({
//       amount: process.env.REACT_APP_BASE_PRICE,
//       currency: process.env.REACT_APP_CURRENCY,
//       quantity: 1,
//     }),
//     loading: false,
//     error: null,
//   });

//   const handleClick = async (event) => {
//     // Call your backend to create the Checkout session.
//     dispatch({ type: 'setLoading', payload: { loading: true } });
//     // When the customer clicks on the button, redirect them to Checkout.
//     const stripe = await stripePromise;
//     const { error } = await stripe.redirectToCheckout({
//       mode: 'payment',
//       lineItems: [{ price: state.priceId, quantity: state.quantity }],
//       successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancelUrl: `${window.location.origin}/canceled`,
//     });
//     // If `redirectToCheckout` fails due to a browser or network
//     // error, display the localized error message to your customer
//     // using `error.message`.
//     if (error) {
//       dispatch({ type: 'setError', payload: { error } });
//       dispatch({ type: 'setLoading', payload: { loading: false } });
//     }
//   };

//   return (

//     <div className="sr-root">
//       <div className="sr-main">
//         <header className="sr-header">
//           <div className="sr-header__logo"></div>
//         </header>
//         <section className="container">
//           <div>
//             <h1>Single photo</h1>
//             <h4>Purchase a Pasha original photo</h4>
//             <div className="pasha-image">
//               <img
//                 alt="Random asset from Picsum"
//                 src="https://picsum.photos/280/320?random=4"
//                 width="140"
//                 height="160"
//               />
//             </div>
//           </div>
//           <div className="quantity-setter">
//             <button
//               className="increment-btn"
//               disabled={state.quantity === 1}
//               onClick={() => dispatch({ type: 'decrement' })}
//             >
//               -
//             </button>
//             <input
//               type="number"
//               id="quantity-input"
//               min="1"
//               max="10"
//               value={state.quantity}
//               readOnly
//             />
//             <button
//               className="increment-btn"
//               disabled={state.quantity === 10}
//               onClick={() => dispatch({ type: 'increment' })}
//             >
//               +
//             </button>
//           </div>
//           <p className="sr-legal-text">Number of copies (max 10)</p>

//           <button role="link" onClick={handleClick} disabled={state.loading}>
//             {state.loading || !state.price
//               ? `Loading...`
//               : `Buy for ${state.price}`}
//           </button>
//           <div className="sr-field-error">{state.error?.message}</div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
