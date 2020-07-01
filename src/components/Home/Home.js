import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Carousel from './Carousel/Carousel'
import './Home.css'

export default class Home extends Component{
  constructor(){
    super()
    this.state={
      inventory:[]
    }
  }

  componentWillMount(){
    this.getInventory()
  }

  getInventory = () => {
    axios.get('/api/products')
    .then(res => {
      this.setState({inventory: res.data})
    })
    // .catch(err => console.log(err))
  }
  
  render(){
    return(
      <div className = 'home'>
        <Carousel />
        <div className ='home-boxes'>
          <div className ='home-box sm'>
            <h1>Household Goods</h1>
            <img 
              className = 'home-img'
              // src = {this.state.inventory[0].img}
              alt = 'bamboo'
            />
            <button className = 'home-link'>
              <Link to = '/dash'>Browse Household Goods</Link>
            </button>
          </div>
          <div className ='home-box sm'>
            
          </div>
          <div className ='home-box sm'>
            
          </div>
          <div className ='home-box lg'>
  
          </div>
          <div className ='home-box sm'>
            
          </div>
        </div>
      </div>
    )
  }

}