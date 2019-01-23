import React from "react";
import "./style.css";

function Jumbotron({children}) {
  return (
    <div className="jumbotron text-center pt-3">
      <h1 className="pt-0">{children}</h1>
      {/* <a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/books/">
        Search for and Save Books of Interest 
      </a> */}
    </div>
  );
}

export default Jumbotron;
