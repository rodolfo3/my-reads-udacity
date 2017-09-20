import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAll } from './BooksAPI';

import Shelf from './Shelf';


const SHELFS = [
  'currentlyReading',
  'wantToRead',
  'read',
];


const SHELF_NAME = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read',
};


class Home extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    getAll().then(books => this.setState({ books }));
  }

  render() {
    return (
      <div>
        {
          SHELFS.map(
            shelf => (
              <Shelf
                key={SHELF_NAME[shelf]}
                title={SHELF_NAME[shelf]}
                books={this.state.books.filter(b => b.shelf === shelf)}
              />
            )
          )
        }
        <Link to="/search">search</Link>
      </div>
    );
  }
}


export default Home;
