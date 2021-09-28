import logo from './logo.svg';
import logo2 from './Assets/spin.png'
import './App.css';
import React from 'react';
import AppRouterView from './AppRouterView/AppRouterView';
import TopNavBar from './myComponents/TopNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './myComponents/Footer';

export default class App extends React.Component  {
  render() {
    console.log("Host URL" + process.env.PUBLIC_URL);
    return (
      <div className="App">
        
        {/* Header */}
        <div className="App-header container-fluid w-100">
          <img src={logo2} className="App-logo mb-3" alt="logo" />
          <h1 className="App-title">Spin My Portfolio</h1>

          {/* Navbar */}
          <TopNavBar/>
        </div>

        {/* Router View */}
        <AppRouterView/>


        {/* Footer */}
        <Footer 
          children="MY FOOTER"
        />
      </div>

    );
  }
}
