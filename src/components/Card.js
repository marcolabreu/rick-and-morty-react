import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    return (
      <article className="Card">
        <div className="CardImage">
          <img src={this.props.character.image} alt={this.props.character.name}/>
        </div>
        <ul>
          <h2 className="CardName">{this.props.character.name}</h2>
          <li className="CardStatus">{this.props.character.status}</li>
          <li className="CardSpecies">{this.props.character.species}</li>
          <li className="CardGender">{this.props.character.gender}</li>
        </ul>
      </article>
    );
  }
}
