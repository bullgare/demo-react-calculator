import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

import Calculator from './components/calculator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Calculator</h1>
        </header>

        <Calculator>123</Calculator>
      </div>
    );
  }
}

export default App;
