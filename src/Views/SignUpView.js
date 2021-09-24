import React from "react"
import SignUpForm from "../myComponents/SignUpForm";
import Container from 'react-bootstrap/Container';
import SectionHeading from "../myComponents/SectionHeading";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

export default class SignUpView extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      signUp: {
        username: '',
        password: ''
      }
    }

  }

  async cognitoSignUp(username, password) {

    // Post to Cognito
    try {
      const { user } = await Auth.signUp({
          'username': username,
          'password': password,
          attributes: {
            email : '',
            phone_number : ''
          }
      });
      console.log(user);       
    } catch (error) {
      console.log('error signing up:', error);
    }
   
  };

  handleUsernameInputChangeSignUp = e => {
    this.setState(prevState => {
      let signUp = Object.assign({}, prevState.signUp);  // creating copy of state variable jasper
      signUp.username = e.target.value                   // update the name property, assign a new value                 
      return { signUp };                                 // return new object jasper object
    });
  }

  handlePasswordInputChangeSignUp = e => {
    this.setState(prevState => {
      let signUp = Object.assign({}, prevState.signUp);  // creating copy of state variable jasper
      signUp.password = e.target.value                   // update the name property, assign a new value                 
      return { signUp };                                 // return new object jasper object
    });
    // this.setState({signIn: {password: e.target.value}})
  }

  handleFormSubmitSignUp = () => {

    console.log('Signing up the following user:')
    console.log(this.state.signUp.username);
    console.log(this.state.signUp.password);

    // cognito sign up
    this.cognitoSignUp(this.state.signUp.username, this.state.signUp.password);
  }

  render () {
    return (
      <Container>
        <SectionHeading title={'Sign Up'}/>
        <SignUpForm
          usernameValue={this.state.signUp.username}
          passwordValue={this.state.signUp.password}
          onChangeUser={this.handleUsernameInputChangeSignUp}
          onChangePass={this.handlePasswordInputChangeSignUp}
          handleSignUp={this.handleFormSubmitSignUp}
        />
      </Container>


    )
  }
}