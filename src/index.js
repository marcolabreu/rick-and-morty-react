import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

const GITHUB_BASE_URL = 'https://api.github.com/graphql'
const RICK_API = 'https://rickandmortyapi.com/api/';
const RICK_GRAPHQL = 'https://rickandmortyapi.com/graphql/';

const httpLink = new HttpLink({
  uri: RICK_GRAPHQL,
  headers: {  },
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
