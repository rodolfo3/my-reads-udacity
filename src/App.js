import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import { getAll, update } from './BooksAPI';

import './App.css';

import Header from './Header';
import Home from './Home';
import SearchResult from './SearchResult';


class App extends Component {
  state = {
    booksByShelf: {},
  }

  constructor() {
    super();
    this.addToShelf = this.addToShelf.bind(this);
    this.removeFromShelf = this.removeFromShelf.bind(this);
    this.getShelf = this.getShelf.bind(this);
  }

  getFromApi() {
    return getAll()
      .then(books => {
        const booksByShelf = {};
        books.forEach(book => {
          const { shelf } = book;
          booksByShelf[shelf] = booksByShelf[shelf] || [];
          booksByShelf[shelf].push(book);
        });

        return booksByShelf;
      })
      .then(booksByShelf => {
        this.setState({ booksByShelf });
        return booksByShelf;
      });
  }

  componentDidMount() {
    this.getFromApi();
  }

  addToShelf({ id, shelf }) {
    return update({ id }, shelf)
      .then(() => this.getFromApi())
      .then(booksByShelf => booksByShelf[shelf].find(book => book.id === id))
    ;
  }

  removeFromShelf({ id, shelf }) {
    return update({ id }, 'none')
      .then(() => this.getFromApi())
      .then(booksByShelf => booksByShelf[shelf].find(book => book.id === id))
    ;
  }

  getShelf({ id }) {
    return Object.keys(this.state.booksByShelf)
      .map(
        (shelf) => {
          return this.state.booksByShelf[shelf].find(book => book.id === id) && shelf
        }
      )
      .reduce((acc, shelf) => acc || shelf);
  }

  getChildContext() {
    return {
      addToShelf: this.addToShelf,
      removeFromShelf: this.removeFromShelf,
      getShelf: this.getShelf,
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" render={() => <Home booksByShelf={this.state.booksByShelf} />} />
        <Route exact path="/search" component={SearchResult} />
      </div>
    );
  }
};


App.childContextTypes = {
  addToShelf: PropTypes.func,
  removeFromShelf: PropTypes.func,
  getShelf: PropTypes.func,
}

const Routes = () =>
  <BrowserRouter>
    <App />
  </BrowserRouter>
;


export default Routes;
