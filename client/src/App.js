import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
 
//components
import BookList from './componensts/BookList';
import AddBook from './componensts/AddBook';

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
})

class App extends Component {
  render() {
    
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
