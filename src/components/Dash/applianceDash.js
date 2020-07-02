import React, {Component} from 'react'
import axios from 'axios'
import Product from '../Product/Product'
import { connect } from 'react-redux'

import {updateInventory} from '../../redux/productReducer'

class Dash extends Component{

  constructor(props){
    super(props)
    this.state ={
      inventory: []
    }
  }

  componentDidMount(){
    this.getInventory()
    // this.props.updateInventory()
  }

  getInventory = () => {
    axios.get('/api/products/appliance')
    .then(res => {
      this.setState({inventory: res.data})
    })
    .catch(err => console.log(err))
  }

  render(){
    
    return (
      <div>
        {/* {this.props.productReducer.inventory.map((e) => { */}
        {this.state.inventory.map((e) => {
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