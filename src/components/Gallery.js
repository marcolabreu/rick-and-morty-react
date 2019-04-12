import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Card from './Card'
import {queryCharacters} from "./Queries";

export default class Gallery extends Component {
  state = {
    query: {
      page: 1,
      filter: {
        status: "",
        species: "",
        gender: "",
        name: ""
      },
    },
    info: {},
    sorting: ""
  }

  ascendantByKey = (array, key) => array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
  // TODO: refactor both functions to one
  descendantByKey = (array, key) => array.sort(function (a, b) {
    var x = b[key];
    var y = a[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })

  render() {
    return (
      <div>
        {/* TODO: extract pagination and filters to components */}
        {/* TODO: add reset filters button */}
        {/* FIX: blank page bug caused by over-filtering to no results */}
        <button
          onClick={e => this.setState({query: {filter: {...this.state.query.filter}, page: this.state.info.prev}})}
        >previous page</button>
        <button
          onClick={e => this.setState({query: {filter: {...this.state.query.filter}, page: this.state.info.next}})}
        >next page</button>
        <div className={"filters"}>
          <form>
            <input type="text" placeholder="filter by name..." onChange={e =>
              this.setState({query: {filter: {...this.state.query.filter, name: e.target.value}}})
            }/>
          </form>
          <select onChange={e =>
            this.setState({query: {filter: {...this.state.query.filter, species: e.target.value}}})
          }>
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
          <select onChange={e =>
            this.setState({query: {filter: {...this.state.query.filter, gender: e.target.value}}})
          }>
            <option value="">filter by genre</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
          <select onChange={e =>
            this.setState({query: {filter: {...this.state.query.filter, status: e.target.value}}})
          }>
            <option value="">filter by status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select onChange={e =>
            this.setState({ sorting: e.target.value})
          }>
            <option value="">sort by name</option>
            <option value="ascendant">Ascendant</option>
            <option value="descendant">Descendant</option>
          </select>
        </div>

        <Query query={queryCharacters}
               errorPolicy="all"
               fetchPolicy="cache-and-network"
               variables={{
                 page: this.state.query.page,
                 status: this.state.query.filter.status,
                 species: this.state.query.filter.species,
                 gender: this.state.query.filter.gender,
                 name: this.state.query.filter.name,
               }}
        >
          {({error, loading, data}) => {
            if (error) return <div>Something is wrong...</div>
            if (loading) return <div>Loading...</div>

            /* FIX: we use assignment to avoid setState rerender loop
           Is there a better way? */
            this.state.info = data.characters.info
            console.log(this.state.info.pages)
            console.log(this.state.query.page)
            // this.setState({info: data.characters.info})
            const characters = data.characters.results

            /* The Rick and Morty GraphQL server documentation do not mention
            server sorting so we do it client side */
            if (this.state.sorting === "ascendant") {
              this.ascendantByKey(characters, 'name');
            }
            /* FIX: Since sorting is only working on client side,
            we need to ask pages in reverse order when descendant*/
            if (this.state.sorting === "descendant") {
              this.descendantByKey(characters, 'name');
            }

            if (characters) {return (
              <div>
                <div className="Gallery">
                  {characters.map(character => <Card
                    key={character.id}
                    character={character}
                  />)}
                </div>
              </div>
            // Returning renders a blank component
            )} else return null
          }}
        </Query>
      </div>
    )
  }
}
