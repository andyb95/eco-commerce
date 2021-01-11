import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const sessionId = location.search.replace('?session_id=', '');
  console.log(sessionId)
  return (
    <div className="sr-root">
      <div className="sr-main">
        <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header>
        <div className="sr-payment-summary completed-view">
          <h1>Your payment succeeded</h1>
          {/* <h4>Checkout Session ID: {sessionId}</h4> */}
        </div>
      </div>
    </div>
  );
};

export default Success;
