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

  // TODO: refactor both sort functions to one
  ascendantByKey = (array, key) => array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
  descendantByKey = (array, key) => array.sort(function (a, b) {
    var x = b[key];
    var y = a[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })

  render() {
    return (
      <div>
        <div className={"Paginator"}>
          {/* TODO: extract pagination and filters to components
          it may require Redux */}
          {/* TODO: add reset filters button */}
          <button
            onClick={e => {
              if (this.state.info.pages === 1) return null
              this.state.info.prev
                ? this.setState({query: {filter: {...this.state.query.filter}, page: this.state.info.prev}})
                : this.setState({query: {filter: {...this.state.query.filter}, page: this.state.info.pages}})
            }}
          >previous page
          </button>

          <span>page {this.state.query.page ? this.state.query.page : "1"}</span>

          <button
            onClick={e => {
              if (this.state.info.pages === 1) return null
              this.setState({query: {filter: {...this.state.query.filter}, page: this.state.info.next}})
            }}
          >next page</button>
        </div>


        <div className={"Filters"}>
          <form>
            <input type="text" placeholder="filter by name..." 
            onSubmit={e => (e.stopPropagation(), e.nativeEvent.stopImmediatePropagation())}
            onChange={e =>
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

            /* TODO: FIX: we use assignment to avoid setState rerender loop
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
            /* TODO: FIX: API either doesn't support or didn't document it
                we only have client side sorting and we need to ask for the last page first*/
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
            // Returning null is required to render a blank component
            )} else return null
          }}
        </Query>
      </div>
    )
  }
}
