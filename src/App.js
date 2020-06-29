import React from 'react';
import Nav from './components/Nav/Nav'
import routes from './routes'
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className = 'body'>
        {routes}
      </div>
    </div>
  );
}

export default App;
