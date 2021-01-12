module.exports = {

  getCart: async (req, res) => {
    const {user_id} = req.params
    const db = req.app.get('db')

    const cart = await db.get_cart(user_id)
    if (!cart[0]){
      res.status(200).send([])
    } else {
      res.status(200).send(cart)
    } 
  },

  addItem: async (req, res) => {
    const {user_id} = req.params
    const {product_id} = req.body
    const db = req.app.get('db')

    try{
      const updatedCart = await db.add_to_cart([user_id, product_id])
      res.status(200).send(updatedCart)
    } catch {
      res.status(500).send("Couldn't Add to Cart")
    }
  },

  removeItem: async (req, res) => {
    const {cart_id, user_id} = req.params
    const db = req.app.get('db')

    try{
      const updatedCart = await db.remove_from_cart(cart_id, user_id)
      res.status(200).send(updatedCart)
    } catch {
      res.status(500).send("Couldn't Delete From Cart")
    }
  },

  total: async(req, res) =>{
    const {user_id} = req.params
    const db = req.app.get('db')

    try{
      const total = await db.get_price(user_id)
      res.status(200).send(total)
    } 
    catch{
      res.status(500).send("Didn't get total")
    }
  },

  charge: async (req, res, stripe) => {
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
  },

  order: async (req, res) => {
    const { user_id, product_id, orderDate, cart_id } = req.body
    const db = req.app.get('db')

    try {
      const order = await db.add_order(user_id, product_id, orderDate, cart_id)
      res.status(200).send(order)
    } catch (e) {
      res.status(500).send('Order history not updated')

    }
  }
}