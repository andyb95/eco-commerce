require('dotenv').config()
const cors = require('cors')
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)
// const uuid = require("uuid")
const express = require('express')
const massive = require('massive')
const session = require('express-session')
// const env = require('dotenv').config({path: './.env'})
const {resolve} = require('path')

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

const auth = require('./authController')
const product = require('./productController')
const cart = require('./cartController')

const app = express()

app.use(express.static(process.env.STATIC_DIR));
app.get('/checkout', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html')
  res.sendFile(path)
})

app.get("/stripe-key", (req, res) => {
  res.send({ publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY });
});

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // You should always calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1;
};

app.post("/pay/:id/:amount", async (req, res) => {
  
  const { id, amount
    // , paymentIntentId, items, currency, useStripeSdk 
  } = req.params;
  // const orderAmount = calculateOrderAmount(items);
  
  try {
    let intent;
    if (id) {
      // Create new PaymentIntent with a PaymentMethod ID from the client.
      intent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method: id,
        confirmation_method: "manual",
        confirm: true,
        // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
        // to take advantage of new authentication features in mobile SDKs
        // use_stripe_sdk: useStripeSdk,
      });
      console.log(intent)
      
      // After create, if the PaymentIntent's status is succeeded, fulfill the order.
    } else if (intent.id) {
      // Confirm the PaymentIntent to finalize payment after handling a required action
      // on the client.
      intent = await stripe.paymentIntents.confirm(intent.id);
      // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
    }
    res.send(generateResponse(intent));
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, etc
    // See https://stripe.com/docs/declines/codes for more
    res.send({ error: e.message });
  }
});

const generateResponse = intent => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case "requires_action":
    case "requires_source_action":
      // Card requires authentication
      return {
        requiresAction: true,
        clientSecret: intent.client_secret
      };
    case "requires_payment_method":
    case "requires_source":
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: "Your card was denied, please provide a new payment method"
      };
    case "succeeded":
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log("💰 Payment received!");
      return { clientSecret: intent.client_secret };
  }
};

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
app.get('/auth/getUser', auth.getUser)

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

app.post('/api/charge', cart.charge)

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