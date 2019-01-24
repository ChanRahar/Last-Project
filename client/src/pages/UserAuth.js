import React, { Component } from "react";
import { MDBContainer } from 'mdbreact';
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import API from "../utils/API"

class UserAuth extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    loggedIn: false
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleSignIn = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    API.login({
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        console.log(response);
        this.setState({ loggedIn: true, username: response.data.username });
        alert(`Welcome ${this.state.username}`)
        window.location.href = "/"
      })
      .catch(() => alert("Wrong Credential, Please try again"));

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    // alert(`Hello ${this.state.email} ${this.state.password}`);
    this.setState({
      email: "",
      password: ""
    });
  };

  handleSignUp = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    API.signUp({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
      .then(() => {
        alert("Register Complete");

        window.location.href = "/Login"
      })
      .catch(() => alert("Try another Username or Email Already Used"));


    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    // alert(`Hello ${this.state.username} ${this.state.email} ${this.state.password}`);
    this.setState({
      username: "",
      email: "",
      password: ""
    });
  };

  componentDidMount() {

    // Check session data to see if user should be logged in
    API.signedIn()
      .then(response => {
        console.log(response);
        if (response.data.loggedIn) {
          this.setState({ loggedIn: true, username: response.data.username });
        } else {
          console.log("No logged in user stored in session");
        }
      });
  }

  render() {
    return (
      <MDBContainer>
        {
          window.location.pathname === "/Login" ?
            <SignIn
              onSubmit={this.handleSignIn}
              onChange={this.handleInputChange}
              email={this.state.email}
              password={this.state.password}
            />
            :
            <SignUp
              onSubmit={this.handleSignUp}
              onChange={this.handleInputChange}
              username={this.state.username}
              email={this.state.email}
              password={this.state.password}
            />
        }
      </MDBContainer>
    );
  };
}

export default UserAuth;