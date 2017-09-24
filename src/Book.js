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


const BookMenu = (props) => {
  const { visible, updating, open } = props;

  if (updating) {
    return (
      <div className="book-menu">
        Updating...
      </div>
    );
  }

  if (visible) {
    return <BookOptions {...props} />;
  }

  return (
    <button
      onClick={open}
      className="book-menu-button"
    >
      menu
    </button>
  );
};



class Book extends Component {
  state = {
    status: 'ok',
    menuVisible: false,
  }
  constructor() {
    super();
    this.addToShelf = this.addToShelf.bind(this);
    this.open = this.open.bind(this);
  }


  addToShelf({id, shelf}) {
    this.setState({ status: 'adding' });
    this.context.addToShelf({id, shelf}).then(
      () => this.setState({ menuVisible: false, status: 'ok' })
    )
  }

  open() {
    this.setState({ menuVisible: true });
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
        <BookMenu
          id={id}
          shelf={shelf}
          addToShelf={this.addToShelf}
          visible={this.state.menuVisible}
          open={this.open}
          updating={this.state.status === 'adding'}
        />
      </div>
    );
  }
};
Book.contextTypes = {
  addToShelf: PropTypes.func,
}

export default Book;
