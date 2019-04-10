import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Card from './Card'
import {GET_CHARACTERS} from "./Queries";

export default class Gallery extends Component {
  render() {
    return (
      <Query query={GET_CHARACTERS}
             errorPolicy="all"
             variables={{
               page: null,
               status: "alive",
               species: "",
               gender: "",
               name: "rick",
             }}
      >
        {({loading, error, data}) => {
          if (error) return <div>Something is wrong...</div>
          if (loading) return <div>Loading...</div>

          const info = data.characters.info
          const characters = data.characters.results

          return (
            <div className="Gallery">
              {characters.map(character => <Card
                key={character.name}
                character={character}
              />)}
            </div>
          )
        }}
      </Query>
    )
  }
}
