import React, { Component } from "react";
// import Nav from "../components/Nav";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import Card from "../components/Card";
import "./style.css";


class Main extends Component {

    render() {
        return (
            <div>
                <br></br>
                <Jumbotron />
                <Container className="center-block">
                    <Row className="center-block">
                        <Col size="md-12" >
                            <Card />
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Main;