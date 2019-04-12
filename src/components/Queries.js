import gql from 'graphql-tag'

export const queryCharacters = gql`
  query Character(
    $page: Int = 1,
    $status: String = "",
    $species: String = "",
    $gender: String = "",
    $name: String = "") 
  {
    characters(page: $page,
      filter: {
        status: $status,
        species: $species,
        gender: $gender,
        name: $name})
    {
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
`
