import React, {Component} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Card from './Card'

const GET_CHARACTERS = gql`
  {
    characters(page: 1, filter: { status: "alive", species: "alien" }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`

export default class Gallery extends Component {
  render() {
    return (
      <Query query={GET_CHARACTERS} errorPolicy="all">
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
