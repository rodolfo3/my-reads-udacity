import React, { Component } from 'react';
import { search } from './BooksAPI';

import Shelf from './Shelf';


class SearchResult extends Component {
  state = {
    books: [],
    searchTerm: '',
  }

  getSearchTerm(props) {
    const { location } = props;
    const query = /[?&]q=([^&]*)/.exec(location.search);

    if (!query) return null;

    return decodeURIComponent(query[1]);
  }

  searchFor(searchTerm) {
    if (searchTerm) {
      search(searchTerm, 10)
      .catch((err) => {
        if (err.message === 'empty query') {
          return [];
        }
        console.error(err);
      })
      .then(
        books => this.setState({ books, searchTerm })
      )
    }
  }

  componentDidMount() {
    this.searchFor(this.getSearchTerm(this.props));
  }

  componentWillReceiveProps(props) {
    const searchTerm = this.getSearchTerm(props);
    if (this.state.searchTerm !== searchTerm) {
      this.searchFor(searchTerm);
    }
  }

  render() {
    if (this.state.searchTerm !== this.getSearchTerm(this.props)) {
      return <span>Searching...{this.state.searchTerm} != {this.getSearchTerm(this.props)}</span>;
    }

    return (
      <Shelf
        books={this.state.books}
      />
    );
  }
}


export default SearchResult;
