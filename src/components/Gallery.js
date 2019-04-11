import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Card from './Card'
import {GET_CHARACTERS} from "./Queries";

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
        <h2>Awesome Paginator</h2>
        <Query query={GET_CHARACTERS}
               errorPolicy="all"
               variables={{
                 page: this.state.page,
                 status: this.state.filter.status,
                 species: this.state.filter.species,
                 gender: this.state.filter.gender,
                 name: this.state.filter.name,
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
      </div>
    )
  }
}
