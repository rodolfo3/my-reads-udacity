import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import { getAll } from './BooksAPI';

import './App.css';

import Header from './Header';
import Shelf from './Shelf';

class BooksShelf extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.props.fetchBooks().then(books => this.setState({ books }));
  }

  render() {
    return <Shelf title="All the books" books={this.state.books} />;
  }
}


class App extends Component {
  state = {
    books: [],
  }

  render() {
    return (
      <div>
        <Header />
        <Link to="/search">search</Link>
        <BooksShelf fetchBooks={getAll} />
      </div>
    );
  }
};


const Routes = () =>
  <BrowserRouter>
    <App />
  </BrowserRouter>
;


export default Routes;
