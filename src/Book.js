import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { SHELFS, SHELF_NAME } from './config';


const BookAction = ({ currentShelf, shelf, add }) => {
  if (currentShelf === shelf) {
    return <span>{ SHELF_NAME[currentShelf] }</span>;
  } else {
    return <a href="#" onClick={add}>{ SHELF_NAME[currentShelf] }</a>;
  }
};


const BookMenu = ({ id, shelf, addToShelf }) =>
  <span>
    (
    {
      SHELFS.map(s =>
        <BookAction
          key={s}
          currentShelf={s}
          shelf={shelf}
          add={() => addToShelf({ id, shelf: s })}
        />
      )
    }
    )
  </span>
;


class Book extends Component {
  render() {
    const { title, id, shelf } = this.props;
    return (
      <div>
        { title }
        <BookMenu id={id} shelf={shelf} addToShelf={this.context.addToShelf} />
      </div>
    );
  }
};

Book.contextTypes = {
  addToShelf: PropTypes.func,
}

export default Book;
