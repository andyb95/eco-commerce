import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Product from './components/OrderProduct'

const OrderHistory = ({ userReducer }) => {
  const [orders, setOrders] = useState([])
  const [ordersRetrieved, setOrdersRetrieved] = useState(false)

  useEffect(() => {
    const getOrders = async () => {
      await axios.get(`/api/orderHistory/${userReducer.user_id}`)
        .then(res => {
          setOrders(res.data)
        })
        .catch(e => console.error(e))
    }
    if (!ordersRetrieved) {
      getOrders()
      setOrdersRetrieved(true)
    }
  },[ordersRetrieved, userReducer])
  return (
    <div>
      {orders.map(o => {
        return (
          <Product
            key={o.product_id}
            product={o}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(OrderHistory)