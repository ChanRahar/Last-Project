import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, Card, CardBody, CardTitle } from 'mdbreact';
import Header from "../components/Header";
import Img from "../components/Img";

const rock = "./images/rock.jpg"
const paper = "./images/paper.jpg"
const scissors = "./images/scissors.jpg"
const computerChoices = ["Rock", "Paper", "Scissors"];

class RPS extends Component {

    state = {
        playerChoice: null,
        computerGuess:computerChoices[Math.floor(Math.random() * computerChoices.length)],

        winner: null,
        wins: 0,
        losses: 0,
    }

    gameLogic = (playerChoice) => {

        this.setState({playerChoice: playerChoice});

        if (playerChoice === "Rock" && this.state.computerGuess === "Rock") {
            this.setState({ winner: "tie" });
        }
        else if (playerChoice === "Paper" && this.state.computerGuess === "Paper") {
            this.setState({ winner: "tie" });
        }
        else if (playerChoice === "Scissors" && this.state.computerGuess === "Scissors") {
            this.setState({ winner: "tie" });
        }
        else if (playerChoice === "Rock" && this.state.computerGuess === "Paper") {
            this.setState({ winner: "lose", losses:this.state.losses + 1 });
        }
        else if (playerChoice === "Rock" && this.state.computerGuess === "Scissors") {
            this.setState({ winner: "win", wins:this.state.wins + 1 });;
        }
        else if (playerChoice === "Paper" && this.state.computerGuess === "Rock") {
            this.setState({ winner: "win", wins:this.state.wins + 1 });;
        }
        else if (playerChoice === "Paper" && this.state.computerGuess === "Scissors") {
            this.setState({ winner: "lose", losses:this.state.losses + 1 });
        }
        else if (playerChoice === "Scissors" && this.state.computerGuess === "Rock") {
            this.setState({ winner: "lose", losses:this.state.losses + 1 });
        }
        else if (playerChoice === "Scissors" && this.state.computerGuess === "Paper") {
            this.setState({ winner: "win", wins:this.state.wins + 1 });;
        }

        const reset = () => {
            this.setState({winner: null, computerGuess:computerChoices[Math.floor(Math.random() * computerChoices.length)]});
        }

        setTimeout(reset, 1000 * 3);
    }

    render() {

        const choiceImg = (choice) => {
            if (choice === "Rock") {
                return <Img width="5.7rem" height="5.7rem" src={rock} alt="rock" />
            } else if (choice === "Paper") {
                return <Img width="5.7rem" height="5.7rem" src={paper} alt="paper" />
            } else if (choice === "Scissors") {
                return <Img width="5.7rem" height="5.7rem" src={scissors} alt="scissors" />
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
                    RPS vs Computer
                </Header>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol xl="12" className="d-flex justify-content-center my-1">
                            <Card className="text-center" style={{ width: "29rem", height: "27rem" }}>
                                <CardBody>
                                    <CardTitle className="text-center mb-1">{didWin()}</CardTitle>
                                    {this.state.winner === null ?
                                        <ul>
                                            <li onClick={() => this.gameLogic("Rock")}>
                                                <Img width="6.5rem" height="6.5rem" src={rock} alt="rock" />
                                            </li>

                                            <li className="py-2" onClick={() => this.gameLogic("Paper")}><Img width="6.5rem" height="6.5rem" src={paper} alt="paper" /></li>

                                            <li onClick={() => this.gameLogic("Scissors")}>
                                                <Img width="6.5rem" height="6.5rem" src={scissors} alt="scissors" />
                                            </li>
                                        </ul>
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

export default RPS;