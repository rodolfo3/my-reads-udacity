import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Header from './Header';
import Home from './Home';
import SearchResult from './SearchResult';


class App extends Component {
  state = {
    books: [],
  }

  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchResult} />
      </div>
    );
  }
};


const Routes = () =>
  <BrowserRouter>
    <App />
  </BrowserRouter>
;


export default Routes;
