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

  // componentDidMount(){
  //   this.getInventory()
  // }

  // getInventory = async () => {
  //   const inventory = await axios.get('/api/products')
  //   console.log(inventory)
  //   this.setState({inventory: inventory})
    

  
  //   // .catch(err => console.log(err))
  // }
  
  render(){
    return(
      <div className = 'home'>
        <Carousel />
        <div className ='home-boxes'>
          <div className ='home-box sm'>
            <h1>Household Goods</h1>
            <img 
              className = 'home-img'
              src = 'https://images-na.ssl-images-amazon.com/images/I/81ySHs5CxCL._AC_SL1500_.jpg'
              alt = 'bamboo'
            />
            <button className = 'home-link'>
              <Link className = 'home-link-link' to = '/houseDash'>Browse Household Goods</Link>
            </button>
          </div>
          <div className ='home-box sm'>
            <h1>Appliances</h1>
            <img 
              className = 'home-img'
              src = 'https://images-na.ssl-images-amazon.com/images/I/71yD4RSesbL._AC_SL1500_.jpg'
              alt = 'bidet'
            />
            <button className = 'home-link'>
              <Link className = 'home-link-link' to = '/applianceDash'>Browse Appliances</Link>
            </button>
          </div>
          <div className ='home-box sm'>
          <h1>Help Plant Trees</h1>
            <img 
              className = 'home-img'
              src = 'https://clevaster.files.wordpress.com/2017/02/wp-1487553812365.jpg?w=384'
              alt = 'reforest'
            />
            <button className = 'home-link'>

              <a className = 'home-link-link'
                href ='https://onetreeplanted.org/?ads_cmpid=1738761287&ads_adid=71314422477&ads_matchtype=b&ads_network=g&ads_creative=385614967322&utm_term=%2Breforestation%20%2Bngo&ads_targetid=kwd-422673318470&utm_campaign=&utm_source=adwords&utm_medium=ppc&ttv=2&gclid=Cj0KCQjw6PD3BRDPARIsAN8pHuFVUiGuKhdAAc_p77Ovq5o6IHRwnos8-aClgODX6DPgI0PBcjjEIrcaAtKSEALw_wcB'
              >Support Reforestation</a>
            </button>
          </div>
        </div>
      </div>
    )
  }

}