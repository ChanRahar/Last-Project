import React, { Component } from "react";
import "./style.css";
import { MDBContainer, MDBRow, MDBCol, Animation, MDBBtn, Card, CardBody, CardTitle } from 'mdbreact';
import firebase from "../firebase"
import API from "../utils/API"
import Header from "../components/Header";
import Img from "../components/Img";


const database = firebase.database();
const chatData = database.ref("/chat");
const playersRef = database.ref("players");
const currentTurnRef = database.ref("turn");
const win = database.ref("win");
const rock = "./images/rock.jpg"
const paper = "./images/paper.jpg"
const scissors = "./images/scissors.jpg"
let playerRef = "";
let currentPlayers = null;
let username = "";
let playerNum = null;
let playerOneExists = false;
let playerTwoExists = false;
let playerOneData = null;
let playerTwoData = null;

const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

class RPS extends Component {

    state = {
        username: "",
        chat: [],
        currentTurn: null,
        winner: null,
        loggedIn: false,


        playerOne: {
            name: "Waiting for Player 1",
            wins: 0,
            losses: 0,
        },

        playerTwo: {
            name: "Waiting for Player 2",
            wins: 0,
            losses: 0,
        }


    }

    playerChoice(choice) {

        let clickChoice = choice;

        playerRef.child("choice").set(clickChoice);

        currentTurnRef.transaction((turn) => {
            return turn + 1;

        });
    }

    render() {

        const whoWon = (winner) => {
            if (winner === "Tie") {
                return (
                    <Animation type="fadeIn">
                        <Img
                            width="17rem"
                            height="17rem"
                            src="http://www.vestaretailerawards.com/wp-content/uploads/2016/10/no-winner.jpg"
                        />
                    </Animation>
                )
            } else if (winner !== null) {
                return (
                    <div>
                        <Img
                            width="15rem"
                            height="15rem"
                            src="https://thumbs.gfycat.com/DescriptiveMassiveFugu-max-1mb.gif"
                        />
                        <h1>
                            {winner}
                        </h1>
                    </div>
                )
            } else {
                return (
                    <Img
                        width="29rem"
                        height="27rem"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rock-paper-scissors.svg/300px-Rock-paper-scissors.svg.png"
                    />
                )
            }
        }

        const choiceImg = (choice) => {
            if (choice === "Rock") {
                return <Img width="10rem" height="10rem" src={rock} />
            } else if (choice === "Paper") {
                return <Img width="10rem" height="10rem" src={paper} />
            } else if (choice === "Scissors") {
                return <Img width="10rem" height="10rem" src={scissors} />
            }
        }

        return (
            <MDBContainer fluid>
                <Header>
                    RPS vs AI
                </Header>
                <MDBContainer>
                    <MDBRow>
                       
                        <MDBCol xl="12" className="d-flex justify-content-center my-1">
                            <div ref={player2 => this.player2 = player2} />
                            <Card className="text-center" style={{ width: "29rem", height: "27rem" }}>
                            <CardBody>
                                    <CardTitle className="text-center mb-1">Choose from Below:</CardTitle>
                                  
                                            <ul className="pt-1">
                                                <li onClick={() => this.playerChoice("Rock")}><Img width="6rem" height="6rem" src={rock} /></li>

                                                <li className="py-3" onClick={() => this.playerChoice("Paper")}><Img width="6rem" height="6rem" src={paper} /></li>

                                                <li onClick={() => this.playerChoice("Scissors")}><Img width="6rem" height="6rem" src={scissors} /></li>
                                            </ul>

                                        {this.state.currentTurn === 3 ? choiceImg(playerTwoData.choice) : null}

                                        <div className="outcomes">
                                            <div className="outcome-trackers" id="player1-wins">Wins: {this.state.playerOne.wins} </div>
                                            <div className="outcome-trackers" id="player1-losses"> Losses: {this.state.playerOne.losses}</div>
                                        </div>
                                </CardBody>
                            </Card>
                        </MDBCol>
                       
                    </MDBRow>
                </MDBContainer>
            </MDBContainer>
        );
    }

}

export default RPS;