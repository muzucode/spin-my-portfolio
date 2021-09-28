import React from 'react';
import '../App.css';
import {Auth} from 'aws-amplify'


export default class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn : null 
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }
 
  renderSignUpTab = () => {
    if(!this.state.loggedIn) {
      // console.log('rendering sign up...');
      return (
        <span><a href="/signup">Sign Up</a>{' '}|{' '}</span>
      );
    }
  }

  renderSignInTab = () => {
    if(!this.state.loggedIn) {
      // console.log('rendering sign in...');
      return (
        <span><a href="/signin">Sign In</a>{' '}|{' '}</span>
      );
    }
  }

  renderSignOutTab = () => {
    if(this.state.loggedIn) {
      // console.log('rendering sign out...');
      return (
        <span><a href="/spin" onClick={e => this.handleSignOut(e)}>Sign Out</a> {' '}|{' '}</span>
      );
    }
  }

  handleSignOut = (e) => {
    // Must do this to prevent page re-rendering
    e.preventDefault();

    console.log('entered');
    Auth.signOut()
      .then(() => {
        // Route to signin
        window.location.href = '/signin'
      });
    this.setState({loggedIn : false});
  }

  isLoggedIn = () => {
    try {
      Auth.currentAuthenticatedUser()
        .then(() => {
          this.setState({loggedIn: true});
        });
    }
    catch {
      this.setState({loggedIn: false});
    }
  }
  
  render () {  
    return (
      <div className="container top-nav">
        {/* Sign Out */}
        {this.renderSignOutTab()}
        {/* Sign Up */}
        {this.renderSignUpTab()}
        {/* Sign In */}
        {this.renderSignInTab()}
        <a href="/leaderboards">Leaderboards</a>{' '}|{' '}
        <a href="/my-portfolio">My Portfolio</a>{' '}|{' '}
        <a href="/spin">Spin an Asset</a>
      </div>
    )
  }
}