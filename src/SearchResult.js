import React, { Component } from 'react';
import debounce from 'debounce';
import { search } from './BooksAPI';

import Shelf from './Shelf';


class SearchResult extends Component {
  state = {
    books: [],
    searchTerm: '',
    status: 'empty',
  }

  getSearchTerm(props) {
    const { location } = props;
    const query = /[?&]q=([^&]*)/.exec(location.search);

    if (!query) return null;

    return decodeURIComponent(query[1]);
  }

  searchFor = debounce(
    (searchTerm) => {
      if (searchTerm) {
        this.setState({ status: 'searching' });
        search(searchTerm, 10)
        .catch((err) => {
          if (err.message === 'empty query') {
            return [];
          }
          console.error(err);
        })
        .then(
          books => this.setState({ books, searchTerm, status: 'ok' })
        )
      } else {
        this.setState({ status: 'empty' });
      }
    },
    300
  )

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
    if (this.state.status === 'empty') {
      return <div>Type someting to search</div>;
    }

    if (this.state.status === 'searching') {
      return <div>Searching...</div>;
    }

    if (this.state.status === 'ok') {
      return (
        <Shelf
          books={this.state.books}
        />
      );
    }

    return <div>Oooops: { this.state.status }!</div>
  }
}


export default SearchResult;
