import React from 'react'
import './Product.css'

function Product (props){
  let {name, price, img} = props.product
  return(
    <div className = 'product-container'>
      <img className = 'dash-img' src = {img} alt={name}/>
      <div className ='dash-specs'>
        <h1>{name}</h1>
        <h2>${price}</h2>
      </div>
      <div className = 'buy-buttons'>
        <button className = 'buy-button'>Add to Cart</button>
        <button className = 'buy-button'>Buy Now</button>
      </div>
    </div>
  )
}

export default Product