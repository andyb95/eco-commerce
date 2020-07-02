module.exports = {

  charge: async (req, res) => {
    const { id, amount } = req.body

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
    } catch (error) {
      res.status(404).send("Couldn't charge")
    }
  }

}