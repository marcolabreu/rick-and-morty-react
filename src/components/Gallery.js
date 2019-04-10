import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Card from './Card'

const GET_CHARACTERS = gql`
  {
    query {
      characters {
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
  }
`

export default class Gallery extends Component {
  render() {
    return (
      <Query className="Gallery" query={GET_CHARACTERS}>
        {({loading, error, data}) =>
          {
            if (loading) return <div>Loading</div>
            if (error) return <div>Error</div>

            const characters = data.characters.results

            return (
              <div>
                {() => characters.map(character => <Card
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
