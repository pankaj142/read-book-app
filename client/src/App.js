import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
 
//components
import BookList from './componensts/BookList';
import AddBook from './componensts/AddBook';
import AddAuthor from './componensts/AddAuthor';

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main" className="container">
          <div className="row">
            <BookList/>
          </div>
          <div className="row">
            <div className="col-4">
              <AddBook />
            </div>
            <div className="col-4">
              <AddAuthor/>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
