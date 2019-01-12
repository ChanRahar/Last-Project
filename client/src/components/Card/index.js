import React from "react";
import "./style.css";

function Card() {
    return(
    <div className="card">
        <h2>Login Form</h2>
        <form className="login">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="email-input" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password-input" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <p>Or sign up <a href="/">here</a></p>
        </form>
    </div>
    )
}

export default Card;