import React, {Component} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Card from './Card'

const FEED_QUERY = gql`
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
    const mockup = [
      {
        "id": 1,
        "name": "Rick Sanchez",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
      },
      {
        "id": 2,
        "name": "Morty Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
      },
      {
        "id": 3,
        "name": "Summer Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        "status": "Alive",
        "species": "Human",
        "gender": "Female",
      },
      {
        "id": 4,
        "name": "Beth Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
        "status": "Alive",
        "species": "Human",
        "gender": "Female",
      },
      {
        "id": 5,
        "name": "Jerry Smith",
        "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
      },
      {
        "id": 118,
        "name": "Evil Morty",
        "image": "https://rickandmortyapi.com/api/character/avatar/118.jpeg",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
      }
    ]

    return (
      <Query className="Gallery" query={FEED_QUERY}>
        {({loading, error, data}) =>
          {
            if (loading) return <div>Loading</div>
            if (error) return <div>Error</div>

            const characters = data.characters.results
            return (
              <div>
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
