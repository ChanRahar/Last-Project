import React, { Component } from "react";
import Nav from "../components/Nav";
import Jumbotron from "../components/Jumbotron";
import "./style.css";
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBContainer } from "mdbreact";


class Main extends Component {


    render() {
        return (
            <>
                <Nav >

                <MDBContainer>
        <div style={{ display: "flex" }} >
          
         
          <MDBPopover
            component="button"
            placement="bottom"
            popoverBody="something"
            className="btn btn-default"
          >
            <MDBPopoverHeader>something</MDBPopoverHeader>
            <MDBPopoverBody>
              Sed posuere consectetur est at lobortis. Aenean eu leo quam.
              Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </MDBPopoverBody>
          </MDBPopover>
         
        </div>
      </MDBContainer>
                </Nav>
                <br />
                <Jumbotron />

            </>
        )
    }
}

export default Main;