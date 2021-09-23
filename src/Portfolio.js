import React from 'react';
import Amplify, { API, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import SignInForm from './myComponents/SignInForm';
import SignUpForm from './myComponents/SignUpForm';


Amplify.configure(awsconfig);


export default class Portfolio extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        userId: 'c5424a13-0daf-4cec-a3e0-e482d0c832ca'
      },
      selectedUser: {},
      signUp: {
        username: '',
        password: ''
      },
      signIn: {
        username: '',
        password: ''
      },
      userInputSignUp: '',
      passInputSignUp: '',
      usernameInputValue: '',
      passwordInputValue: ''
    }

    // Variables for user/pass input
    this.userInputSignUp = '';
    this.passInputSignUp = '';

  }

  componentDidMount() {
    this.getUserPortfolioData(this.state.currentUser.userId);
  }

  getUserPortfolioData(userId) {
    API.get('OrangeAPI','/users/getUser', {
      queryStringParameters: {
        'userId': userId,
      }
    })
    // Receive portfolio
    .then((res) => {
      console.log(res);
      // Set portfolio state
        console.log('Setting selected user with the following data:');
        console.log(res.body[0]);
        this.setState({selectedUser: res.body[0]})
    });
  };

  
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

  getCurrentUserData(cognito, dynamo) {
    if(cognito){
      const user = Auth.currentAuthenticatedUser()
      .then(res => {
        console.log(res);
        // Set currentUser state
        this.setState({currentUser : res});
        return res;
      });

      return user;
    }

    // if(dynamo) {
    //   // Get current user from DB
    //   API.get('OrangeAPI','/users/getUser', {
    //     queryStringParameters: {
    //       user: this.state.currentUser.username,
    //     }
    //   })
    //   // Receive portfolio
    //   .then((res) => {
    //     console.log(res);
    //     // Set portfolio state
    //     if(res.body.includes('DB CALL ERROR')===false) {
    //       console.log(res.body[0]);
    //       this.setState({selectedUser: res.body[0]})
    //     } 
    //     else {
    //       console.error('There was a DB CALL ERROR in Lambda');
    //     }
  
    //   });
    // }


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

    // Cognito sign in, post to DB if user doesn't exist in DB already
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

  // Post user on successful sign up
  async postUser() {
    // Define data
    const data = {
      username: 'MYLOX',
      assets: ['MSFT' , 'AAPL', 'TSLA']
    };

    // Post data to Lambda/DB
    const response = await API.post('OrangeAPI', '/users/postUser', {
      body: data
    });

    console.log(await response);
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

  handleFormSubmitSignIn = () => {

    console.log('Handling sign in form submit');
    console.log(this.state.signIn.username);
    console.log(this.state.signIn.password);

    // cognito sign in
    this.cognitoSignIn(this.state.signIn.username, this.state.signIn.password);

  }

  render () {
    var currentUser = this.state.currentUser;
    // If selected portfolio is nothing, show loading
    // if (Object.entries(this.state.selectedUser).length === 0)
    //   return (<p>Loading data...</p>);
    return (<div className="addmargin">
    <div className="col-md-3">
      {
        <Card className="centeralign">
          <Card.Body>

            <SignUpForm
              usernameValue={this.state.signUp.username}
              passwordValue={this.state.signUp.password}
              onChangeUser={this.handleUsernameInputChangeSignUp}
              onChangePass={this.handlePasswordInputChangeSignUp}
              handleSignUp={this.handleFormSubmitSignUp}
            />


            <SignInForm
              usernameValue={this.state.signIn.username}
              passwordValue={this.state.signIn.password}
              onChangeUser={this.handleUsernameInputChangeSignIn}
              onChangePass={this.handlePasswordInputChangeSignIn}
              handleSignIn={this.handleFormSubmitSignIn}
            />


            <p>{currentUser.userId}</p>
            <p>{currentUser.userId}</p>

            <Button onClick={() => {this.getCurrentUser()}}>
              Get current user
            </Button> 

            <Button onClick={() => {this.postUser()}}>
              Post user with portfolio
            </Button>            

          </Card.Body>
        </Card>
      }
    </div>
    <div className="col-md-6">

    </div>
  </div>)
  }

}

