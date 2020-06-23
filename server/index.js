require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

const auth = require('./authController')
const product = require('./productController')
const cart = require('./cartController')

const app = express()

app.use(express.json())
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
// app.post('/api/photo/:product_id', product.addPhoto)
// app.put('/api/product/:product_id', product.editProduct)
// app.delete('/api/product/:product_id', product.deleteProduct)
// app.delete('/api/photo/:photo_id', product.deletePhoto)

//cart:
app.get('/api/users/:user_id/cart', cart.getCart)
app.post('/api/users/:user_id/cart', cart.addItem)
app.delete('/api/users/:user_id/cart', cart.removeItem)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then (db => {
  app.set('db', db)
  console.log('db connected')
  app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
})