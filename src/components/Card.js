import React from 'react'

const Card = (props) => {
  return (
    <article className="Card">
      <div className="CardImage">
        <img src={props.character.image} alt={props.character.name}/>
      </div>
      <ul>
        <h2 className="CardName">{props.character.name}</h2>
        <li className="CardSpecies">{props.character.species}</li>
        <li className="CardGender">{props.character.gender}</li>
        <li className="CardStatus">{props.character.status}</li>
      </ul>
    </article>
  )
}
export default Card;
