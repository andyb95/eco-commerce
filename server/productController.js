module.exports = {
  
  getInventory: async(req, res) => {
    const db = req.app.get('db')
    
    try {
      const inventory = await db.get_inventory()
      res.status(200).send(inventory)
    } catch (err) {
      console.log(err)
      res.status(500).send("Couldn't get inventory")
    }
  },

  getProduct: async(req, res) => {
    const { product_id } = req.params
    const db = req.app.get('db')
    try {
      const product = await db.get_product(product_id)
      res.status(200).send(product)
    } catch (e) {
      console.error(e)
      res.status(400).send("Couldn't find product")
    }
  },
  
  getCategory: async(req, res) => {
    const {category} = req.params
    const db = req.app.get('db')
  
    try{
      const products = await db.get_product_by_category(category)
      res.status(200).send(products)
    } catch {
      res.status(404).send("Couldn't find products")
    }
  },
  
  getName: async(req, res) => {
    const {name} = req.params
    const db = req.app.get('db')
  
    try{
      const product = await db.get_product_by_search(name)
      res.status(200).send(product)
    } catch {
      res.status(404).send("Couldn't find products")
    }
  },

  getOrderHistory: async(req, res) => {
    const { user_id } = req.params
    const db = req.app.get('db')

    try {
      const orderHistory = await db.get_order_history(user_id)
      res.status(200).send(orderHistory)
    } catch {
      res.status(400).send("Couldn't Find Order History")
    }
  },

  addProduct: async (req, res) => {
    const {name, price, img, description, category} = req.body
    const db = req.app.get('db')

    const product = await db.add_product(name, price, img, description, category)
    if (product[0]){
      res.status(200).send(product)
    } else {
      res.status(500).send("Couldn't Add Product")
    }
  },

  editProduct: async (req, res) => {
    const {product_id} = req.params
    const {name, price, img, description, category} = req.body
    const db = req.app.get('db')

    const update = await db.update_product([product_id, name, price, img, description, category])
    if (update[0]){
      res.status(200).send(update)    
    } else {
      res.status(500).send("Couldn't update")
    }
  },

  deleteProduct: async (req, res) => {
    const {product_id} = req.params
    const db = req.app.get('db')

    try{
      await db.delete_product(product_id)
      res.status(200).send('Deleted')
    } catch {
      res.status(404).send("Couldn't delete")
    }
  },

  addPhoto: async (req, res) => {
    const {product_id} = req.params
    const {extra_img} = req.body
    const db = req.app.get('db')
    
    try{
      const photo = await db.add_photo(product_id, extra_img)
      res.status(200).send(photo)
    } catch {
      res.sendStatus(500)
    }
  },

  deletePhoto: async (req, res) => {
    const {photo_id} = req.params
    const db = req.app.get('db')

    try{
      await db.delete_photo(photo_id)
      res.status(200).send('Deleted')
    } catch {
      res.status(404).send("Couldn't delete")
    }
  },



}