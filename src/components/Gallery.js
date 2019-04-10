import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Card from './Card'
import {GET_CHARACTERS} from "./Queries";

export default class Gallery extends Component {
  render() {
    return (
      <Query query={GET_CHARACTERS}
             errorPolicy="all"
             // variables={{
             //   page,
             //   status,
             //   species,
             //   gender,
             //   name,
             // }}
      >
        {({loading, error, data}) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Something is wrong... {error.graphQLErrors.map(({message}, i) => (
            <p key={i}>{message}</p>
          ))}</div>

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
        }
        }
      </Query>
    )
  }
}
