module.exports = {

  getCart: async (req, res) => {
    const {user_id} = req.params
    const db = req.app.get('db')

    const cart = await db.get_cart(user_id)
    if (!cart.length){
      res.status(200).send("Cart is Empty")
    } else {
      res.status(200).send(cart)
    } 
  },

  addItem: async (req, res) => {
    const {user_id} = req.params
    const {product_id} = req.body
    const db = req.app.get('db')

    try{
      const newItem = await db.add_to_cart([user_id, product_id])
      res.status(200).send(newItem)
    } catch {
      res.status(500).send("Couldn't Add to Cart")
    }
  },

  removeItem: async (req, res) => {
    const {cart_id} = req.params
    const db = req.app.get('db')

    try{
      await db.remove_from_cart(cart_id)
      res.status(200).send('Deleted')
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
  }

}