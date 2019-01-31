import React from 'react'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';

function SignUp({ onSubmit, onChange, username, email, password }) {
  
    return (
        <MDBRow className="pt-3">
              <MDBCol className="d-flex justify-content-center">
                <MDBCard>
                  <form onSubmit={onSubmit}>
                    <MDBCardBody className="mx-4">
                      <div className="text-center">
                        <h3 className="pink-text mb-5">
                          <strong>Sign up</strong>
                        </h3>
                      </div>
                      <MDBInput label="Your Username" group type="text" validate
                        name="username"
                        value={username}
                        onChange={onChange}
                      />
                      <MDBInput label="Your email" group type="email" validate
                        name="email"
                        value={email}
                        onChange={onChange} />
                      <MDBInput label="Your password" group type="password" validate
                        name="password"
                        value={password}
                        onChange={onChange} />
                      <MDBRow className="d-flex align-items-center mb-4">
                        <MDBCol md="6" className="text-center">
                          <button
                            type="submit"
                            className="btn btn-pink btn-block btn-rounded z-depth-1"
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
                  </form>
                </MDBCard>
              </MDBCol>
            </MDBRow>
    )
}

export default SignUp;