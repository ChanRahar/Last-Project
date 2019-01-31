import React from 'react'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';

const styles = {
  size: {
      width: "330px"
  }
}

function SignIn({ onSubmit, onChange, email, password }) {
    return (
        <MDBRow className="pt-3">
              <MDBCol className="d-flex justify-content-center">
                <MDBCard style={styles.size}> 
                  <form onSubmit={onSubmit}>
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
                        value={email}
                        onChange={onChange}
                      />
                      <MDBInput
                        label="Your password"
                        group
                        type="password"
                        validate
                        containerClass="mb-0"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                      <p className="font-small blue-text d-flex justify-content-end pb-3">
                        <a href="/Password" className="blue-text ml-1">
                        Forgot Password?
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
    )
}

export default SignIn;