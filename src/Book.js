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


const BookOptions = ({ id, shelf, addToShelf, removeFromShelf }) =>
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
    <li>
      <BookAction
        currentShelf={null}
        shelf={shelf}
        add={() => removeFromShelf({ id, shelf })}
      />
    </li>
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
    shelf: null,
  }
  constructor() {
    super();
    this.addToShelf = this.addToShelf.bind(this);
    this.removeFromShelf = this.removeFromShelf.bind(this);
    this.open = this.open.bind(this);
  }

  removeFromShelf({ id, shelf }) {
    this.context.removeFromShelf({ id, shelf })
  }

  addToShelf({id, shelf}) {
    this.setState({ status: 'adding' });
    this.context.addToShelf({id, shelf}).then(
      () => this.setState({ menuVisible: false, status: 'ok', shelf })
    )
  }

  getShelf() {
    const { id } = this.props;
    return this.state.shelf || this.context.getShelf({ id });
  }

  open() {
    this.setState({ menuVisible: true });
  }

  render() {
    const { title, authors, imageLinks } = this.props;
    const { id } = this.props;

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
          shelf={this.getShelf()}
          addToShelf={this.addToShelf}
          removeFromShelf={this.removeFromShelf}
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
  removeFromShelf: PropTypes.func,
  getShelf: PropTypes.func,
}

export default Book;
