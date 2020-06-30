require('dotenv').config()
const cors = require('cors')
const stripe = require('stripe')("STRIPE_SECRET_KEY")
const uuid = require("uuid")
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

const auth = require('./authController')
const product = require('./productController')
const cart = require('./cartController')

const app = express()

app.use(express.json())
app.use(cors())
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 31},
    secret: SESSION_SECRET
  })
)

//auth:
app.post('/auth/register', auth.register)
app.post('/auth/login', auth.login)
app.put('/auth/edit/:user_id', auth.editUser)
app.delete('/auth/logout', auth.logout)

//product:
app.get('/api/products', product.getInventory)
app.post('/api/product', product.addProduct)
app.get('/api/products/:category', product.getCategory)
app.get('/api/products/:name', product.getName)
// app.post('/api/photo/:product_id', product.addPhoto)
// app.put('/api/product/:product_id', product.editProduct)
// app.delete('/api/product/:product_id', product.deleteProduct)
// app.delete('/api/photo/:photo_id', product.deletePhoto)

//cart:
app.get('/api/users/:user_id/cart', cart.getCart)
app.get('/api/users/:user_id/total', cart.total)
app.post('/api/users/:user_id/cart', cart.addItem)
app.delete('/api/users/:cart_id/cart', cart.removeItem)

//stripe:
app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body)

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});


massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then (db => {
  app.set('db', db)
  console.log('db connected')
  app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
})