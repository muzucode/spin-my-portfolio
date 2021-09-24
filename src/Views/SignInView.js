import React from "react";
import SignInForm from "../myComponents/SignInForm";
import Container from 'react-bootstrap/Container';
import SectionHeading from "../myComponents/SectionHeading";
import Amplify, { API, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

export default class SignInView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signIn: {
        username: '',
        password: ''
      }
    }
  }

  getCurrentUser() {
    const user = Auth.currentAuthenticatedUser()
    .then(res => {
      console.log(res);
      // Set currentUser state
      this.setState({currentUser : res});
      return res;
    });

    return user;
  } 

  cognitoSignIn (username, password) {
    try {
      // Sign in
      const user = Auth.signIn(username, password)
      .then(res => {
        console.log(res);
        return res;
      })
      .then(() => {
        // If successful sign in, post user to DB
        this.postCurrentUserToDB(username);
      })
      .catch(err => {
        console.error(err);
      })

      return user;
    } catch (error) {
        console.log('error signing in', error);
    }
    
  }

  async postCurrentUserToDB(username) {
    var userAttributes;
    try {
      // Get attributes of current user
      const {attributes} = await Auth.currentAuthenticatedUser();

      // Save attributes
      userAttributes = attributes;
      console.log(userAttributes);
      
      // Post to db
      const response = await API.post('OrangeAPI', '/users/putInDB', {
        body: {
          'userId' : userAttributes.sub,
          'username': username
        }
      });
  
      console.log(await response);
    }
    catch (err) {
      console.log('error posting to DB:', err);
    }
  }

  handleUsernameInputChangeSignIn = e => {
    this.setState(prevState => {
      let signIn = Object.assign({}, prevState.signIn);  // creating copy of state variable jasper
      signIn.username = e.target.value                   // update the name property, assign a new value                 
      return { signIn };                                 // return new object jasper object
    });
  }

  handlePasswordInputChangeSignIn = e => {
    this.setState(prevState => {
      let signIn = Object.assign({}, prevState.signIn);  // creating copy of state variable jasper
      signIn.password = e.target.value                   // update the name property, assign a new value                 
      return { signIn };                                 // return new object jasper object
    });
    // this.setState({signIn: {password: e.target.value}})
  }

  handleFormSubmitSignIn = () => {

    console.log('Handling sign in form submit');
    console.log(this.state.signIn.username);
    console.log(this.state.signIn.password);

    // cognito sign in
    this.cognitoSignIn(this.state.signIn.username, this.state.signIn.password);

  }

  render () {
    return (
      <Container>
        <SectionHeading title={'Sign In'}/>
        <SignInForm
          usernameValue={this.state.signIn.username}
          passwordValue={this.state.signIn.password}
          onChangeUser={this.handleUsernameInputChangeSignIn}
          onChangePass={this.handlePasswordInputChangeSignIn}
          handleSignIn={this.handleFormSubmitSignIn}
        />
      </Container>
    )
  }
}