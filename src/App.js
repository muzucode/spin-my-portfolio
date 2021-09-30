import logo3 from './Assets/LogoMona.png'
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
          <img src={logo3} className="App-logo mb-3" alt="logo" />
          <h1 className="App-title">Fine Point</h1>

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
