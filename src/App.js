import React, { Component } from 'react';
import Gallery from "./components/Gallery";
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className={"ui huge header"}>Rick and Morty Characters</h1>
        </header>
        <Gallery/>
      </div>
    );
  }
}
