import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import './App.css';
import Header from './Header';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        --
        <br/>
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
