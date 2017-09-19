import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Header from './Header';
import Home from './Home';



class App extends Component {
  state = {
    books: [],
  }

  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Link to="/search">search</Link>
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
