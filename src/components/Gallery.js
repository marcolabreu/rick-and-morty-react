import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Card from './Card'
import {queryCharacters} from "./Queries";

export default class Gallery extends Component {
  state = {
    page: null,
    filter: {
      status: "",
      species: "",
      gender: "",
      name: ""
    }
  }

  render() {
    return (
      <div>
        git sta <Query query={queryCharacters}
               errorPolicy="all"
               fetchPolicy="cache-and-network"
               variables={{
                 page: this.state.page,
                 status: this.state.filter.status,
                 species: this.state.filter.species,
                 gender: this.state.filter.gender,
                 name: this.state.filter.name,
               }}
        >
          {({error, loading, data}) => {
            if (error) return <div>Something is wrong...</div>
            if (loading) return <div>Loading...</div>

            const info = data.characters.info
            const characters = data.characters.results

            return (
              <div>
                <h2>Awesome Page</h2>
                <div className="Gallery">
                  {characters.map(character => <Card
                    character={character}
                  />)}
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}
