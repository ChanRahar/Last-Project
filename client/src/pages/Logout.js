import React, { Component } from 'react';
import API from "../utils/API"


class Logout extends Component {

  logout = () => {
    console.log("clicked")
    API.logout()
      .then(window.location.href = "/")
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        {this.logout()}
      </>
    )
  }
}

export default Logout;