import React from 'react'
import ReactDOM from 'react-dom'

// GraphQL Apollo imports
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'


import * as serviceWorker from './serviceWorker'
import './index.css'
import App from './App'

const RICK_GRAPHQL = 'https://rickandmortyapi.com/graphql'

const httpLink = new HttpLink({
  uri: RICK_GRAPHQL,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // do something with graphql error
  }

  if (networkError) {
    // do something with network error
  }
})

const link = ApolloLink.from([errorLink, httpLink])
const cache = new InMemoryCache()
const client = new ApolloClient({
  link,
  cache
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
