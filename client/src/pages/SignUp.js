import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdbreact';

class Signup extends Component {

  state = {
    username: "",
    email: "",
    password:"",

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

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    alert(`Hello ${this.state.username} ${this.state.email} ${this.state.password}`);
    this.setState({
      username: "",
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <MDBContainer>
        <p>
          Hello {this.state.username} {this.state.email} {this.state.password}
        </p>
        <MDBRow className="pt-3">
          <MDBCol className="d-flex justify-content-center">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="pink-text mb-5">
                    <strong>Sign up</strong>
                  </h3>
                </div>
                <MDBInput label="Your Username" group type="text" validate
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
                <MDBInput label="Your email" group type="email" validate
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange} />
                <MDBInput label="Your password" group type="password" validate
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange} />
                <MDBRow className="d-flex align-items-center mb-4">
                  <MDBCol md="6" className="text-center">
                    <button
                      type="button"
                      className="btn btn-pink btn-block btn-rounded z-depth-1"
                      onClick={this.handleFormSubmit}
                    >
                      Sign up
                    </button>
                  </MDBCol>
                  <MDBCol md="6">
                    <p className="font-small grey-text d-flex justify-content-end">
                      Have an account?
                      <a href="/Login" className="blue-text ml-1">

                        Log in
                      </a>
                    </p>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <div className="footer pt-3 mdb-color lighten-3">
                <MDBRow className="d-flex justify-content-center">
                  <p className="font-small white-text mb-2 pt-3">
                    or Sign up with:
                  </p>
                </MDBRow>
                <MDBRow className="mt-2 mb-3 d-flex justify-content-center">
                  <a href="#!" className="fa-lg p-2 m-2 fb-ic">
                    <MDBIcon className="fa fa-facebook white-text fa-lg"> </MDBIcon>
                  </a>
                  <a href="#!" className="fa-lg p-2 m-2 tw-ic">
                    <MDBIcon className="fa fa-twitter white-text fa-lg"> </MDBIcon>
                  </a>
                  <a href="#!" className="fa-lg p-2 m-2 gplus-ic">
                    <MDBIcon className="fa fa-google-plus white-text fa-lg"> </MDBIcon>
                  </a>
                </MDBRow>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };
}

export default Signup;