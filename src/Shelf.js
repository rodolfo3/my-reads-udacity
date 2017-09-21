import React from 'react';
import Book from './Book';


const Shelf = ({ books, title }) =>
  <div>
    <h2>{ title }</h2>
    { books.map(book => <Book key={book.id} {...book} />) }
  </div>
;

export default Shelf;
