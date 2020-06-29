import React, { Component } from 'react';

class RightArrow extends Component {
  render() {
    return(
      <div>
        <button className='backArrow' onClick={this.props.goToNextSlide}>Next</button> 
        <i className='fa fa-angle-left fa-3x' aria-hidden='true'></i>
      </div>
    )
  }
}
export default RightArrow;