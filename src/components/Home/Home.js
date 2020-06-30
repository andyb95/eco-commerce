import React from 'react'
import Carousel from './Carousel/Carousel'
import './Home.css'

export default function Home (){
  
  
  return(
    <div className = 'home'>
      <Carousel />
      <div className ='home-boxes'>
        <div className ='home-box 1/3'>
          
        </div>
        <div className ='home-box 1/3'>
          
        </div>
        <div className ='home-box 2/3'>

        </div>
      </div>
    </div>
  )

}