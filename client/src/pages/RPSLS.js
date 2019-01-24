import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, Card, CardBody, CardTitle } from 'mdbreact';
import Header from "../components/Header";
import Img from "../components/Img";

const rock = "./images/RPSLS-rock.png"
const paper = "./images/RPSLS-paper.png"
const scissors = "./images/RPSLS-scissors.png"
const lizard = "./images/RPSLS-lizard.png"
const spock = "./images/RPSLS-spock.png"
const computerChoices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];

class RPSLS extends Component {

    state = {
        playerChoice: null,
        computerGuess: computerChoices[Math.floor(Math.random() * computerChoices.length)],

        winner: null,
        wins: 0,
        losses: 0,
    }

    gameLogic = (playerChoice) => {

        this.setState({ playerChoice: playerChoice });

        if (playerChoice === "Rock" && this.state.computerGuess === "Rock") {
            this.setState({ winner: "tie" });
        }
        else if (playerChoice === "Paper" && this.state.computerGuess === "Paper") {
            this.setState({ winner: "tie" });
        }
        else if (playerChoice === "Scissors" && this.state.computerGuess === "Scissors") {
            this.setState({ winner: "tie" });
        }
        else if (playerChoice === "Lizard" && this.state.computerGuess === "Lizard") {
            this.setState({ winner: "tie" });
        }
        else if (playerChoice === "Spock" && this.state.computerGuess === "Spock") {
            this.setState({ winner: "tie" });
        }
        else if (playerChoice === "Rock" && this.state.computerGuess === "Paper") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });
        }
        else if (playerChoice === "Rock" && this.state.computerGuess === "Scissors") {
            this.setState({ winner: "win", wins: this.state.wins + 1 });;
        }
        else if (playerChoice === "Rock" && this.state.computerGuess === "Lizard") {
            this.setState({ winner: "win", losses: this.state.wins + 1 });
        }
        else if (playerChoice === "Rock" && this.state.computerGuess === "Spock") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });;
        }
        else if (playerChoice === "Paper" && this.state.computerGuess === "Rock") {
            this.setState({ winner: "win", wins: this.state.wins + 1 });;
        }
        else if (playerChoice === "Paper" && this.state.computerGuess === "Scissors") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });
        }
        else if (playerChoice === "Paper" && this.state.computerGuess === "Lizard") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });;
        }
        else if (playerChoice === "Paper" && this.state.computerGuess === "Spock") {
            this.setState({ winner: "win", wins: this.state.wins + 1 });
        }
        else if (playerChoice === "Scissors" && this.state.computerGuess === "Rock") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });
        }
        else if (playerChoice === "Scissors" && this.state.computerGuess === "Paper") {
            this.setState({ winner: "win", wins: this.state.wins + 1 });;
        }
        else if (playerChoice === "Scissors" && this.state.computerGuess === "Lizard") {
            this.setState({ winner: "win", wins: this.state.wins + 1 });
        }
        else if (playerChoice === "Scissors" && this.state.computerGuess === "Spock") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });;
        }
        else if (playerChoice === "Lizard" && this.state.computerGuess === "Rock") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });
        }
        else if (playerChoice === "Lizard" && this.state.computerGuess === "Paper") {
            this.setState({ winner: "win", wins: this.state.wins + 1 });;
        }
        else if (playerChoice === "Lizard" && this.state.computerGuess === "Scissors") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });
        }
        else if (playerChoice === "Lizard" && this.state.computerGuess === "Spock") {
            this.setState({ winner: "win", wins: this.state.wins + 1 });;
        }
        else if (playerChoice === "Spock" && this.state.computerGuess === "Rock") {
            this.setState({ winner: "win", wins: this.state.wins + 1  });
        }
        else if (playerChoice === "Spock" && this.state.computerGuess === "Paper") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });;
        }
        else if (playerChoice === "Spock" && this.state.computerGuess === "Scissors") {
            this.setState({ winner: "win", wins: this.state.wins + 1 });
        }
        else if (playerChoice === "Spock" && this.state.computerGuess === "Lizard") {
            this.setState({ winner: "lose", losses: this.state.losses + 1 });;
        }

        const reset = () => {
            this.setState({ winner: null, computerGuess: computerChoices[Math.floor(Math.random() * computerChoices.length)] });
        }

        setTimeout(reset, 1000 * 2);
    }

    render() {

        const choiceImg = (choice) => {
            if (choice === "Rock") {
                return <Img width="5.7rem" height="5.7rem" src={rock} alt="rock" />
            } else if (choice === "Paper") {
                return <Img width="5.7rem" height="5.7rem" src={paper} alt="paper" />
            } else if (choice === "Scissors") {
                return <Img width="5.7rem" height="5.7rem" src={scissors} alt="scissors" />
            } else if (choice === "Lizard") {
                return <Img width="5.7rem" height="5.7rem" src={lizard} alt="lizard" />
            } else if (choice === "Spock") {
                return <Img width="5.7rem" height="5.7rem" src={spock} alt="spock" />
            }
            
        }

        const didWin = () => {
            if (this.state.winner === "tie") {
                return <>No Winner <i className="em em-neutral_face"></i></>
            } else if (this.state.winner === "win") {
                return <>You Win! <i className="em em-smile"></i></>
            } else if (this.state.winner === "lose") {
                return <>You Lose! <i className="em em-cry"></i></>
            } else {
                return "Choose from Below:"
            }
        }

        return (
            <MDBContainer fluid>
                <Header>
                Rock Paper Scissors Lizard Spock vs CPU
                </Header>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol xl="12" className="d-flex justify-content-center my-1">
                            <Card className="text-center" style={{ width: "29rem", height: "27rem" }}>
                                <CardBody>
                                    <CardTitle className="text-center mb-1">{didWin()}</CardTitle>
                                    {this.state.winner === null ?
                                        <div>
                                            <MDBRow>
                                                <MDBCol>
                                                    <Img onClick={() => this.gameLogic("Rock")} width="6rem" height="6rem" src={rock} alt="rock" />
                                                </MDBCol>
                                                <MDBCol>
                                                    <Img onClick={() => this.gameLogic("Paper")} width="6rem" height="6rem" src={paper} alt="paper" />
                                                </MDBCol>
                                            </MDBRow>
                                            <br />
                                            <MDBRow>
                                                <MDBCol>
                                                    <Img onClick={() => this.gameLogic("Scissors")} width="6rem" height="6rem" src={scissors} alt="scissors" />
                                                </MDBCol>
                                                <MDBCol>
                                                    <Img onClick={() => this.gameLogic("Lizard")} width="6rem" height="6rem" src={lizard} alt="lizard" />
                                                </MDBCol>
                                            </MDBRow>
                                            <br />
                                            <Img onClick={() => this.gameLogic("Spock")} width="6rem" height="6rem" src={spock} alt="spock" />
                                        </div>
                                        :
                                        <ul>
                                            <li>
                                                <div>Computer:</div>
                                                {choiceImg(this.state.computerGuess)}
                                            </li>

                                            <li className="py-1"><Img width="5.7rem" height="5.7rem" src="https://vignette.wikia.nocookie.net/deathbattle/images/6/64/Vs.png/revision/latest?cb=20150618231458" alt="VS" /></li>

                                            <li>
                                                <div>Player:</div>
                                                {choiceImg(this.state.playerChoice)}
                                            </li>
                                        </ul>}


                                    <div className="outcomes">
                                        <div className="outcome-trackers" id="player1-wins">Wins: {this.state.wins} </div>
                                        <div className="outcome-trackers" id="player1-losses"> Losses: {this.state.losses}</div>
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

export default RPSLS;