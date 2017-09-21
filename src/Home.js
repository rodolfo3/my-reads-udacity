import React from 'react';
import { Link } from 'react-router-dom';

import { SHELFS, SHELF_NAME } from './config';
import Shelf from './Shelf';


const Home = ({ booksByShelf }) =>
  <div>
    {
      SHELFS.map(
        shelf => (
          <Shelf
            key={SHELF_NAME[shelf]}
            title={SHELF_NAME[shelf]}
            books={booksByShelf[shelf] || []}
          />
        )
      )
    }
    <Link to="/search">search</Link>
  </div>
;


export default Home;
