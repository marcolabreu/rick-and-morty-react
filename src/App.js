import React, { Component } from 'react';
import logo from './favicon.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Soon, an app to browse through Rick and Morty API.
          </p>
          <a className="App-link" href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer">
            Rick and Morty API
          </a>
        </header>
      </div>
    );
  }
}

export default App;
