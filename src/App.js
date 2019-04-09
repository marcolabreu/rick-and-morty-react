import React, {Component} from 'react';
import Gallery from "./components/Gallery";
import './App.css';

const API = 'https://rickandmortyapi.com/api/';
const GRAPHQL = 'https://rickandmortyapi.com/graphql/';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Rick and Morty Characters</h1>
        </header>
        <Gallery/>
      </div>
    );
  }
}
