import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Checkout from './components/Checkout';
import Success from './components/Success';
import Canceled from './components/Canceled';

import './css/normalize.css';
import './css/global.css';

function Stripe() {
  return (
    <Router>
      <Switch>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/canceled">
          <Canceled />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<Stripe />, document.getElementById('root'));
