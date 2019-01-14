import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import API from "../utils/API"

class Login extends Component {

  state = {
    email: "",
    password:"",
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

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    API.login({
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        console.log(response);
        this.setState({loggedIn: true, username: response.data.username });
      });

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    // alert(`Hello ${this.state.email} ${this.state.password}`);
    this.setState({
      email: "",
      password: ""
    });
  };

  componentDidMount() {
    console.log("componentDidMount lifecycle method ran!");
    
    // Check session data to see if user should be logged in
    API.signedIn()
    .then(response => {
      console.log(response);
      if (response.data.loggedIn) {
        this.setState({loggedIn: true, username: response.data.username });
      } else {
        console.log("No logged in user stored in session");
      }
    });
  }

  render() {
    let banner = this.state.loggedIn ? `Woah! ${this.state.username} logged in!` : "UNAUTHORIZED USER";
    return (
      <MDBContainer>
        <h1>{banner}</h1>
        <p>
          Hello {this.state.email} {this.state.password}
        </p>
        <MDBRow className="pt-3">
          <MDBCol className="d-flex justify-content-center">
            <MDBCard>
            <form onSubmit={this.handleFormSubmit}>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign in</strong>
                  </h3>
                </div>
                <MDBInput
                  label="Your email"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="Your password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <p className="font-small blue-text d-flex justify-content-end pb-3">
                  Forgot
                  <a href="#!" className="blue-text ml-1">
  
                    Password?
                  </a>
                </p>
                <div className="text-center mb-3">
                  <MDBBtn
                    type="submit"
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a"
                  >
                    Sign in
                  </MDBBtn>
                </div>
                <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
  
                  or Sign in with:
                </p>
                <div className="row my-3 d-flex justify-content-center">
                  <MDBBtn
                    type="button"
                    color="white"
                    rounded
                    className="mr-md-3 z-depth-1a"
                  >
                    <MDBIcon icon="facebook" className="blue-text text-center" />
                  </MDBBtn>
                  <MDBBtn
                    type="button"
                    color="white"
                    rounded
                    className="mr-md-3 z-depth-1a"
                  >
                    <MDBIcon icon="twitter" className="blue-text" />
                  </MDBBtn>
                  <MDBBtn
                    type="button"
                    color="white"
                    rounded
                    className="z-depth-1a"
                  >
                    <MDBIcon icon="google-plus" className="blue-text" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
              </form>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Not a member?
                  <a href="/SignUp" className="blue-text ml-1">
  
                    Sign Up
                  </a>
                </p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };
}

export default Login;