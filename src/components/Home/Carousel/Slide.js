import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import landingData from './Slides';

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {landing: landingData};
  }

  render() {
    return(
      <section>
      {this.state.landing.map((s, index) =>
        <div className={
          index === this.props.activeIndex ? 'active' : 'slide'}
          key={index}>
            <img 
              className = 'background-img'
              src = {s.img}
              alt = 'background'
            />
            <h1 className={index === 0 ? 'mainSlide heading' : 'slider-item heading'}>{s.title}</h1>
            <p>{s.description}</p>
            <Link to='/dash'><button className='button'>{s.buttons}</button></Link>
            
        </div>
        )}
        </section>
    )
  }
}

export default Slide;