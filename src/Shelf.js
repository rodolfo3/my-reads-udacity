import React from 'react';
import Book from './Book';

import './Shelf.css';


const Shelf = ({ books, title }) =>
  <div>
    <h2>{ title }</h2>
    <ul className="shelf-list">
      {
        books.map(
          book => (
            <li key={book.id} className="shelf-item">
              <Book key={book.id} {...book} />
            </li>
          )
        )
      }
    </ul>
  </div>
;

export default Shelf;
