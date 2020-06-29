import React, { Component } from 'react';

class LeftArrow extends Component {
  render() {
    return(
      <div >
        <button className='backArrow' onClick={this.props.goToPrevSlide}>Back</button>
        <i className='fa fa-angle-left fa-3x' aria-hidden='true'></i>
      </div>
    )
  }
}
export default LeftArrow;