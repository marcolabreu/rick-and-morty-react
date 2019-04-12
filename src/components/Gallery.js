import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Card from './Card'
import {queryCharacters} from "./Queries";

export default class Gallery extends Component {
  state = {
    query: {
      page: 1,
      info: {},
      filter: {
        status: "",
        species: "",
        gender: "",
        name: ""
      },
      sort: ""
    }
  }

  ascendantByKey = (array, key) => array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  });
  descendantByKey = (array, key) => array.sort(function (a, b) {
    var x = b[key];
    var y = a[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  });

  render() {
    return (
      <div>
        <button>previous page</button>
        <button
          // onClick={e => this.setState({query: {page: this.state.query.info.next}})}
        >next page</button>
        <div className={"filters"}>
          {/* TODO: extract search field and filters to components */}
          {/* TODO: add reset filters button */}
          {/* FIX: blank page bug caused by over-filtering to no results */}
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
            this.setState({query: {filter: {...this.state.query.filter}, sort: e.target.value}})
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

            // FIX: state shouldn't be changed directly but setState does not work in here
            // this.setState({query: {info: data.characters.info}})
            const characters = data.characters.results

            /* The Rick and Morty GraphQL server documentation do not mention
            server sorting so we do it client side */
            if (this.state.query.sort === "ascendant") {
              this.ascendantByKey(characters, 'name');
            }
            /* FIX: Since sorting is only working on client side,
            we need to ask pages in reverse order when descendant*/
            if (this.state.query.sort === "descendant") {
              this.descendantByKey(characters, 'name');
            }

            /* FIX: This if  prevents over-filtering crash, but page is rendered blank */
            if (characters) return (
              <div>
                <div className="Gallery">
                  {characters.map(character => <Card
                    key={character.id}
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
