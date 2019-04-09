import React, {Component} from 'react';

export default class Card extends Component {

  render() {
    return (
      <article className="card">
        <div className="card-image">
          <img src={this.props.image} alt={this.props.name}/>
        </div>
        <h2 className="card-name">{this.props.name}</h2>
        <p className="card-status"><span>status</span>{this.props.status}</p>
        <p className="card-species"><span>species</span>{this.props.species}</p>
        <p className="card-gender"><span>gender</span>{this.props.gender}</p>
        <p className="card-origin"><span>origin</span>{this.props.origin}</p>
        <p className="card-last-location"><span>last location</span>{this.props.lastLocation}</p>
      </article>
    );
  }
}
