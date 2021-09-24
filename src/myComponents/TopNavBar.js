import React from 'react';
import '../App.css';


export default class TopNavBar extends React.Component {
  render () {
    return (
      <div className="container top-nav">
        <a href="/signup">Sign Up</a>{' '}|{' '}
        <a href="/signin">Sign In</a>{' '}|{' '}
        <a href="/leaderboards">Leaderboards</a>{' '}|{' '}
        <a href="/my-portfolio">My Portfolio</a>{' '}|{' '}
        <a href="/spin">Spin an Asset</a>
      </div>
    )
  }
}