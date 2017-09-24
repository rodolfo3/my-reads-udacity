import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { SHELFS, SHELF_NAME } from './config';

import './Book.css';

const BookAction = ({ currentShelf, shelf, add }) => {
  if (currentShelf === shelf) {
    return <span className="book-current-shelf">{ SHELF_NAME[currentShelf] }</span>;
  } else {
    return (
      <button onClick={add} className="book-action-btn">
        { SHELF_NAME[currentShelf] }
      </button>
    );
  }
};


const BookOptions = ({ id, shelf, addToShelf }) =>
  <ul className="book-menu">
    {
      SHELFS.map(s =>
        <li key={s}>
          <BookAction
            currentShelf={s}
            shelf={shelf}
            add={() => addToShelf({ id, shelf: s })}
          />
        </li>
      )
    }
  </ul>
;


class BookMenu extends Component {
  state = {
    visible: false,
  }

  constructor(p) {
    super();
    this.open = this.open.bind(this);
  }

  open() {
    this.setState({visible: true});
  }

  render() {
    if (this.state.visible) {
      return <BookOptions {...this.props} />;
    }

    return (
      <button
        onClick={this.open}
        className="book-menu-button"
      >
        menu
      </button>
    );
  }
}



class Book extends Component {
  constructor() {
    super();
    this.addToShelf = this.addToShelf.bind(this);
  }

  addToShelf({id, shelf}) {
    this.context.addToShelf({id, shelf});
  }

  render() {
    const { title, authors, imageLinks } = this.props;
    const { id, shelf } = this.props;

    return (
      <div className="book-container">
        <div>
          <img src={imageLinks.thumbnail} alt={title} />
        </div>
        <h3>
          { title }
        </h3>
        <p className="book-author">
          { authors && authors.join(', ')}
        </p>
        <BookMenu id={id} shelf={shelf} addToShelf={this.addToShelf} />
      </div>
    );
  }
};
Book.contextTypes = {
  addToShelf: PropTypes.func,
}

export default Book;
