import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Card from './Card'
import {queryCharacters} from "./Queries";

export default class Gallery extends Component {
  state = {
    page: 1,
    filter: {
      status: "",
      species: "",
      gender: "",
      name: ""
    },
    info: {}
  }

  render() {
    return (
      <div>
        <div className={"filters"}>
          {/* TODO: extract search field and filters to components */}
          {/* FIX: blank page bug caused by over-filtering to no results */}
          <form>
            <input type="text" placeholder="filter by name..." onChange={ e => {
              e.preventDefault()
              this.setState({filter: {...this.state.filter, name: e.target.value}})
            }}/>
          </form>
          <select onChange={e => {
            this.setState({filter: {...this.state.filter, species: e.target.value}})
          }}>
            <option value="">filter by species</option>
            <option value="alien">Alien</option>
            <option value="animal">Animal</option>
            <option value="cronenberg">Cronenberg</option>
            <option value="disease">Disease</option>
            <option value="human">Human</option>
            <option value="humanoid">Humanoid</option>
            <option value="mytholog">Mytholog</option>
            <option value="robot">Robot</option>
            <option value="unknown">Unknown</option>
          </select>
          <select onChange={e => {
            this.setState({filter: {...this.state.filter, gender: e.target.value}})
          }}>
            <option value="">filter by genre</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
          <select onChange={e => {
            this.setState({filter: {...this.state.filter, status: e.target.value}})
          }}>
            <option value="">filter by status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <Query query={queryCharacters}
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

            this.info = data.characters.info

            /* FIX: This if  prevents over-filtering crash, but page is rendered blank */
            if (data.characters.results) return (
              <div>
                <div className="Gallery">
                  {data.characters.results.map(character => <Card
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
