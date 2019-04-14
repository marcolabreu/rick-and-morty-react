# Rick and Morty React

This is a [React](https://reactjs.org) app to visualize characters from Rick & Morty TV show, available on [Rick and Morty API](https://rickandmortyapi.com) website. They support GraphQL and that technology was chosen as a learning exercise: I never used before. 

The GraphQL Apollo Client was chosen as the means to access the data in hope to simplify the code. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The app automatically build and deployed on each push to he URL https://rick-and-morty-react.netlify.com, using [Netlify](https://www.netlify.com) integration with Github.

The initial requirements were very simple:
* display the characters with pagination;
* be able to filter by status, species and gender;
* be able to search a character by name;
* be able to sort the cards by name (ascendant and descendant).

The last requirement still needs a rewriting implemen sorting all cards, not only the ones in the current page.

Form elements were originally written in plain HTML and later replaced by Semantic UI React Components.


