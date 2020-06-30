import React, { Component } from 'react';

class RightArrow extends Component {
  render() {
    return(
      <div>
        <img className='backArrow right' 
        src = 'https://alexoliveira.me/Hawaii/images/chevron-right.png' 
        alt = 'right arrow'
        onClick={this.props.goToNextSlide}
        />   
        <i className='fa fa-angle-left fa-3x' aria-hidden='true'></i>
      </div>
    )
  }
}
export default RightArrow;