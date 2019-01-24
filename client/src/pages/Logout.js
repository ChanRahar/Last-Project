import React from 'react';
import API from "../utils/API"


function Logout() {

  const logout = () => {
    console.log("clicked")
    API.logout()
      .then(window.location.href = "/")
      .catch(err => console.log(err));
  }  
    return (
      <div>
        {logout()}
      </div>
    )
}

export default Logout;