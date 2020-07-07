import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Product from '../Product/Product'

function Dash(){

  const [inventory, setInventory] = useState([])

  useEffect(() => {
    Axios.get('/api/products')
    .then(res => setInventory(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
        {inventory.map((e) => {
          return <Product 
            key ={e.product_id}
            product={e}
          />
        })}
      </div>
  )
}

export default Dash