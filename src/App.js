import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        ;)
        <Route exact path="/" render={
          () => <div>'root!'</div>
        } />
        <Route exact path="/search" render={
          () => <div>'search!'</div>
        } />
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
