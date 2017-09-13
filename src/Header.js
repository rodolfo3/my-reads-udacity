import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import debounce from 'throttle-debounce/debounce';
import './Header.css';

const Title = () =>
  <div className="Title">
    My Reads
  </div>
;


const extractFromQueryString = ({ search }, name) => {
  const result = new RegExp(`[?&]${name}=([^&]*)`).exec(search);
  if (!result) return '';
  return decodeURIComponent(result[1]) || '';
};


const searchIt = debounce(
  2000,
  (txt, history) => history.replace(`/search?q=${encodeURIComponent(txt)}`),
);


const SearchBox = ({ location, history }) =>
  <div className="Search">
    <Link to="/">◀</Link>
    <input
      type="search"
      defaultValue={extractFromQueryString(location, 'q')}
      onChange={(e) => searchIt(e.target.value, history)}
    />
  </div>
;

const Header = () =>
  <header>
    <Route exact path="/" component={Title} />
    <Route exact path="/search" component={withRouter(SearchBox)} />
  </header>
;


export default Header;
