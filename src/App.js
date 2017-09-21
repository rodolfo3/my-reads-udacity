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

  getChildContext() {
    return {
      addToShelf: this.addToShelf,
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
}

const Routes = () =>
  <BrowserRouter>
    <App />
  </BrowserRouter>
;


export default Routes;
