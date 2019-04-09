import React, {Component} from 'react';
import Card from './components/Card'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Rick and Morty Characters</h1>
        </header>
        <section>
              <Card
                image={'https://rickandmortyapi.com/api/character/avatar/70.jpeg'}
                name={'Concerto'}
                status={'Dead'}
                species={'Humanoid'}
                gender={'Male'}
                origin={'unknown'}
                lastLocation={'unknown'}/>
        </section>
      </div>
    );
  }
}

export default App;
