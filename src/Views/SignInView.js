import React from "react";
import SignInForm from "../myComponents/SignInForm";

export default class SignInView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render () {
    return (
      <div className="container">
        <h1 className="my-4">Sign In</h1>
        <SignInForm/>
      </div>
    )
  }
}