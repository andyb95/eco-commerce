import React, {Component} from 'react'
import axios from 'axios'
import Product from '../Product/Product'
import { connect } from 'react-redux'

import {updateInventory} from '../../redux/productReducer'

class Dash extends Component{

  // constructor(props){
  //   super(props)
  //   this.state ={
  //     inventory: []
  //   }
  // }

  componentDidMount(){
    this.props.updateInventory()
    console.log(this.props.productReducer.inventory)
  }

  render(){
    const {product_id, name, price, img, description} = this.props.productReducer.inventory
    return (
      <div>Dash.js
        {this.props.productReducer.inventory.map((e) => {
          return <Product 
            key ={e.product_id}
            product={e}
          />
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {updateInventory})(Dash)