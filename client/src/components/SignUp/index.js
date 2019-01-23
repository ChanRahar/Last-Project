import React from 'react'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdbreact';

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
    )
}

export default SignUp;