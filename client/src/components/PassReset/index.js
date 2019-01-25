import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';

const FormPage = ({ onSubmit, onChange, username, email, password }) => {
  const styles = {
    width: "330px"
  }

  return (
    <MDBContainer className="pt-3">
      <MDBRow >
        <MDBCol className="d-flex justify-content-center">
          <MDBCard style={styles}>
            <MDBCardBody>
              <form onSubmit={onSubmit}>
                <p className="h4 text-center py-4">Password Reset</p>
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                  Your username
                </label>
                <input
                  type="text"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
                <br />
                <label
                  htmlFor="defaultFormCardEmailEx"
                  className="grey-text font-weight-light"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="defaultFormCardEmailEx"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
                <br />
                <label
                  htmlFor="defaultFormCardEmailEx"
                  className="grey-text font-weight-light"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="defaultFormCardEmailEx"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
                <div className="text-center py-4 mt-3">
                  <MDBBtn className="btn btn-outline-purple" type="submit">
                    Reset
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;