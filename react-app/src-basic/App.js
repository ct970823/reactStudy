import React from 'react';
import logo from './logo.svg';
import './Counter.css';

function Counter() {
  return (
    <div className="Counter">
      <header className="Counter-header">
        <img src={logo} className="Counter-logo" alt="logo" />
        <p>
          Edit <code>src/Counter.js</code> and save to reload.
        </p>
        <a
          className="Counter-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Counter;
