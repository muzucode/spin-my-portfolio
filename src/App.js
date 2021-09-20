import logo from './logo.svg';
import './App.css';
import React from 'react';
import Portfolio from './Portfolio';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


export default class App extends React.Component  {
  render() {
    console.log("Host URL" + process.env.PUBLIC_URL);
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple React App</h1>
        </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/portfolio"/>
                )}/>
                 <Route exact path='/portfolio' component={Portfolio} />
          </Switch>
      </div>
    </Router>
    );
  }
}
