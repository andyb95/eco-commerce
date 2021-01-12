import React, { useEffect } from 'react';
import { updateCart } from '../../../../redux/cartReducer'
import { connect } from 'react-redux'

const Success = ({ updateCart }) => {

  useEffect(() => {
    updateCart([])
  },[updateCart])

  return (
    <div className="sr-root">
      <div className="sr-main">
        <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header>
        <div className="sr-payment-summary completed-view">
          <h1>Your payment succeeded</h1>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps, { updateCart })(Success)
