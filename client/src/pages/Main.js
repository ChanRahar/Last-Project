import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { MDBContainer, MDBRow, MDBCol, Card, CardBody, CardTitle, CardText, Button } from 'mdbreact';
import Img from "../components/Img";
import "./style.css";

const styles = {
    currentPlayer: {
        background: "#e4f0d0"
    },
    waitingPlayer: {
        border: "1px solid black"
    }
}

class Main extends Component {


    render() {
        return (
            <div style={styles.currentPlayer}>
                <Jumbotron />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol className="d-flex justify-content-center">
                            <Card style={{ width: "30rem" }}>
                                <Img

                                    src="./images/RPS.PNG"
                                    waves
                                />
                                <CardBody>
                                    <CardTitle className="text-center">RPS Game</CardTitle>
                                    <MDBRow>
                                        <MDBCol className="d-flex justify-content-center">
                                            <Button href="/RPS">Single Player</Button>
                                        </MDBCol>
                                        <MDBCol className="d-flex justify-content-center">
                                            <Button href="/RPS">Online 2 Players</Button>
                                        </MDBCol>
                                    </MDBRow>

                                </CardBody>
                            </Card>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default Main;