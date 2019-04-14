import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Card from './Card'
import {queryCharacters} from "./Queries";
import {genre, sort, species, status}from "./DropdownOptions";
import { Button, Dropdown, Icon, Input } from 'semantic-ui-react'

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
  
  /* Dropdown components pass event, then data, while React 
  accepts any number of optional paramaters before the event*/
  onChangeDropdown = (e, data) => {
    e.target.value = data.value
    this.onChange(data.filter, e)
  }
  onChange = (filter, e) => {
    this.setState({query: {filter: {...this.state.query.filter, [filter]: e.target.value}}})
  }
  
  render() {
    return (
      <div>
        <div className={"Paginator"}>
          {/* TODO: extract pagination and filters to components
          maybe using Redux */}
          <Button icon
            onClick={e => {
              if (this.state.info.pages === 1) return null
              this.state.info.prev
                ? this.setState({query: {filter: {...this.state.query.filter}, page: this.state.info.prev}})
                : this.setState({query: {filter: {...this.state.query.filter}, page: this.state.info.pages}})
            }}
          ><Icon name='chevron left' /> previous page
          </Button>
          
          // TODO: replace with a better styled page counter
          <span>page {this.state.query.page ? this.state.query.page : "1"}</span>

          <Button icon
            onClick={e => {
              if (this.state.info.pages === 1) return null
              this.setState({query: {filter: {...this.state.query.filter}, page: this.state.info.next}})
            }}
          >next page <Icon name='chevron right' />
          </Button>
        </div>


        <div className={"Filters"}>
          <form>
            <Input icon="search" type="text" placeholder="filter by name..."
                   /* onSubmit is not enough to prevent component refresh in some modern 
                   browsers because they use what's called passive event detection */
                   onKeyDown={e => {
                     if (e.keyCode === 13) {
                       e.preventDefault()
                     }
                   }}
                   onSubmit={e => {
                     e.preventDefault()
                   }}
                   onChange={e =>
                     this.setState({query: {filter: {...this.state.query.filter, name: e.target.value}}})
                   }/>
          </form>
          <Dropdown
            placeholder="filter by species"
            selection clearable
            options={species}
            onChange={this.onChangeDropdown}
            filter={`species`}
          />
          <Dropdown
            placeholder="filter by status"
            selection clearable
            options={status}
            onChange={this.onChangeDropdown}
            filter={`status`}
          />
          <Dropdown
            placeholder="filter by genre"
            selection clearable
            options={genre}
            onChange={this.onChangeDropdown}
            filter={`gender`}
          />
          <Dropdown
            placeholder="sort by name"
            selection clearable
            options={sort}
            onChange={(e, data) => this.setState({sorting: data.value})
            }
          />
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

            if (characters) {
              return (
                <div>
                  <div className="Gallery">
                    {characters.map(character => <Card
                      key={character.id}
                      character={character}
                    />)}
                  </div>
                </div>
                // Returning null is required to render a blank component with Apollo
              )
            } else return null
          }}
        </Query>
      </div>
    )
  }
}
