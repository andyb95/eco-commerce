import Stripe from 'stripe'
const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY)

export default async (req, res) => {
  const {id, amount} = req.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'cart',
      payment_method: id,
      confirm: true
    })
    console.log(payment)
    return res.status(200).json({
      confirm: 'abc123'
    })
  } catch(error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
}