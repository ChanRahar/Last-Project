import React, { Component } from "react";
import IdleTimer from 'react-idle-timer';
import { MDBContainer, MDBRow, MDBCol, Animation, Card, CardBody, CardTitle } from 'mdbreact';
import firebase from "../firebase";
import API from "../utils/API";
import Header from "../components/Header";
import Img from "../components/Img";
import NameInput from "../components/NameInput";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

const database = firebase.database();
const chatData = database.ref("/chatRPSLS");
const playersRef = database.ref("playersRPSLS");
const currentTurnRef = database.ref("turnRPSLS");
const win = database.ref("winRPSLS");
const rock = "./images/RPSLS-rock.png"
const paper = "./images/RPSLS-paper.png"
const scissors = "./images/RPSLS-scissors.png"
const lizard = "./images/RPSLS-lizard.png"
const spock = "./images/RPSLS-spock.png"
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

const styles = {
    background: {
        background: "#add8e6"
    },
}

class RPSLSonline extends Component {
    constructor(props) {
        super(props)
        this.idleTimer = null
        this.onIdle = this._onIdle.bind(this)
    }

    _onIdle(e) {
        window.location.href = "/"
    }

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
            choice: ""
        },

        playerTwo: {
            name: "Waiting for Player 2",
            wins: 0,
            losses: 0,
            choice: ""
        }


    };

    playersView = () => {
        if (playerNum === 1) {
            this.player1.scrollIntoView();
        } else if (playerNum === 2) {
            this.player2.scrollIntoView();
        }
    };

    playerCheck = () => {
        const playersRPSRef = database.ref("playersRPS");

        let RPSname
        let RPSname2

        playersRPSRef.on("value", (RPSsnapshot) => {
            RPSname = RPSsnapshot.child("1").child("name").val();
            RPSname2 = RPSsnapshot.child("2").child("name").val();
            if (username === RPSname) {

                window.location.reload();

            } else if (username === RPSname2) {

                window.location.reload();

            }
        })
    };

    gameCheck = () => {
        let RPSLSname
        let RPSLSname2

        if (playerOneExists) {
            playersRef.on("value", (snapshot) => {
                RPSLSname = snapshot.child("1").child("name").val();
                RPSLSname2 = snapshot.child("2").child("name").val();

                if (RPSLSname === RPSLSname2) {

                    alert("Cannot play against yourself")

                    window.location.reload()
                }
            })
        }
    };

    nameSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        if (this.username.value === "" && this.state.username === "") {
            alert("Please Enter Name");
        }
        else if (this.state.username !== "" && this.username.value === "") {
            username = this.state.username

            this.gameCheck();

            this.getInGame();
        }
        else if (this.username.value !== "") {

            let chosenName = capitalize(this.username.value)

            username = chosenName

            this.setState({ username: chosenName });

            this.getInGame();
        }

        this.playersView();
    };

    getInGame = () => {

        // For adding disconnects to the chat with a unique id (the date/time the user entered the game)
        // Needed because Firebase's '.push()' creates its unique keys client side,
        // so you can't ".push()" in a ".onDisconnect"
        let chatDataDisc = database.ref("/chatRPSLS/" + Date.now());

        // Checks for current players, if theres a player one connected, then the user becomes player 2.
        // If there is no player one, then the user becomes player 1
        if (currentPlayers < 2) {

            if (playerOneExists) {
                playerNum = 2;
            }
            else {
                playerNum = 1;
            }

            // Creates key based on assigned player number
            playerRef = database.ref("/playersRPSLS/" + playerNum);

            // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible

            if (this.state.loggedIn === true) {
                API.getUser(this.state.id)
                    .then(res => {
                        playerRef.set({
                            id: res.data._id,
                            name: this.state.username,
                            wins: res.data.wins,
                            losses: res.data.losses,
                            choice: null
                        });
                    })
            } else {
                playerRef.set({
                    name: username,
                    wins: 0,
                    losses: 0,
                    choice: null
                });
            }

            // On disconnect remove this user's player object
            playerRef.onDisconnect().remove();


            // If a user disconnects, set the current turn to 'null' so the game does not continue
            currentTurnRef.onDisconnect().remove();

            // Send disconnect message to chat with Firebase server generated timestamp and id of '0' to denote system message
            chatDataDisc.onDisconnect().set({
                name: username,
                time: firebase.database.ServerValue.TIMESTAMP,
                message: "has disconnected.",
                idNum: 0
            });


        }
        else {
            playerNum = null
            // If current players is "2", will not allow the player to join
            alert("Sorry, Game Full! Try Again Later!");
        }
    };

    gameSetup = () => {

        playersRef.on("value", (snapshot) => {

            // length of the 'players' array
            currentPlayers = snapshot.numChildren();

            // Check to see if players exist
            playerOneExists = snapshot.child("1").exists();
            playerTwoExists = snapshot.child("2").exists();

            // Player data objects
            playerOneData = snapshot.child("1").val();
            playerTwoData = snapshot.child("2").val();

            // If theres a player 1, fill in name and win loss data
            if (playerOneExists) {
                this.setState({
                    playerOne: {
                        name: playerOneData.name,
                        wins: playerOneData.wins,
                        losses: playerOneData.losses,
                        choice: playerOneData.choice
                    }
                });
            }
            else {

                // If there is no player 1, clear win/loss data and show waiting
                this.setState({
                    playerOne: {
                        name: "Waiting for Player 1",
                        wins: 0,
                        losses: 0
                    }
                });
            }

            // If theres a player 2, fill in name and win/loss data
            if (playerTwoExists) {
                this.setState({
                    playerTwo: {
                        name: playerTwoData.name,
                        wins: playerTwoData.wins,
                        losses: playerTwoData.losses,
                        choice: playerTwoData.choice
                    }
                });
            }
            else {

                // If no player 2, clear win/loss and show waiting
                this.setState({
                    playerTwo: {
                        name: "Waiting for Player 2",
                        wins: 0,
                        losses: 0
                    }
                });
            }
        });
    };

    turnSetup = () => {
        playersRef.on("child_added", function (snapshot) {

            if (currentPlayers === 1) {

                // set turn to 1, which starts the game
                currentTurnRef.set(1);
            }
        });

        currentTurnRef.on("value", (snapshot) => {

            // Gets current turn from snapshot
            this.setState({ currentTurn: snapshot.val() });


            // Don't do the following unless you're logged in
            if (playerNum) {

                if (this.state.currentTurn === 3) {

                    // Where the game win logic takes place then resets to turn 1
                    this.gameLogic(playerOneData.choice, playerTwoData.choice);

                    //  show results for 3 seconds, then resets
                    setTimeout(this.gameReset, 1000 * 3);
                }
            }
        });
    };

    gameLogic = (player1choice, player2choice) => {

        if (player1choice === "Rock" && player2choice === "Rock") {
            this.tie();
        }
        else if (player1choice === "Paper" && player2choice === "Paper") {
            this.tie();
        }
        else if (player1choice === "Scissors" && player2choice === "Scissors") {
            this.tie();
        }
        else if (player1choice === "Lizard" && player2choice === "Lizard") {
            this.tie();
        }
        else if (player1choice === "Spock" && player2choice === "Spock") {
            this.tie();
        }
        else if (player1choice === "Rock" && player2choice === "Paper") {
            this.playerTwoWon();
        }
        else if (player1choice === "Rock" && player2choice === "Scissors") {
            this.playerOneWon();
        }
        else if (player1choice === "Rock" && player2choice === "Lizard") {
            this.playerOneWon();
        }
        else if (player1choice === "Rock" && player2choice === "Spock") {
            this.playerTwoWon();
        }
        else if (player1choice === "Paper" && player2choice === "Rock") {
            this.playerOneWon();
        }
        else if (player1choice === "Paper" && player2choice === "Scissors") {
            this.playerTwoWon();
        }
        else if (player1choice === "Paper" && player2choice === "Lizard") {
            this.playerTwoWon();
        }
        else if (player1choice === "Paper" && player2choice === "Spock") {
            this.playerOneWon();
        }
        else if (player1choice === "Scissors" && player2choice === "Rock") {
            this.playerTwoWon();
        }
        else if (player1choice === "Scissors" && player2choice === "Paper") {
            this.playerOneWon();
        }
        else if (player1choice === "Scissors" && player2choice === "Lizard") {
            this.playerOneWon();
        }
        else if (player1choice === "Scissors" && player2choice === "Spock") {
            this.playerTwoWon();
        }
        else if (player1choice === "Lizard" && player2choice === "Rock") {
            this.playerTwoWon();
        }
        else if (player1choice === "Lizard" && player2choice === "Paper") {
            this.playerOneWon();
        }
        else if (player1choice === "Lizard" && player2choice === "Scissors") {
            this.playerTwoWon();
        }
        else if (player1choice === "Lizard" && player2choice === "Spock") {
            this.playerOneWon();
        }
        else if (player1choice === "Spock" && player2choice === "Rock") {
            this.playerOneWon();
        }
        else if (player1choice === "Spock" && player2choice === "Paper") {
            this.playerTwoWon();
        }
        else if (player1choice === "Spock" && player2choice === "Scissors") {
            this.playerOneWon();
        }
        else if (player1choice === "Spock" && player2choice === "Lizard") {
            this.playerTwoWon();
        }
    };

    playerChoice(choice) {

        playerRef.child("choice").set(choice);

        currentTurnRef.transaction((turn) => {
            return turn + 1;

        });
    };

    playerOneWon = () => {

        win.set(playerOneData.name)

        playersRef.child("1").child("wins").set(playerOneData.wins + 1);
        playersRef.child("2").child("losses").set(playerTwoData.losses + 1);

        API.updateUser(
            playerOneData.id,
            {
                win: "win"
            })
            .then(console.log("success"))

        API.updateUser(
            playerTwoData.id,
            {
                win: "lose"
            })
            .then(console.log("success"))
    };

    playerTwoWon = () => {

        win.set(playerTwoData.name)

        playersRef.child("2").child("wins").set(playerTwoData.wins + 1);
        playersRef.child("1").child("losses").set(playerOneData.losses + 1);


        API.updateUser(
            playerOneData.id,
            {
                win: "lose"
            })
            .then(console.log("success"))

        API.updateUser(
            playerTwoData.id,
            {
                win: "win"
            })
            .then(console.log("success"))
    };

    tie = () => {
        win.set("Tie")
    };

    winner = () => {
        win.on("value", snapshot => {

            this.setState({ winner: snapshot.val() });
        });
    };

    gameReset = () => {

        win.set(null)

        win.on("value", snapshot => {

            this.setState({ winner: snapshot.val() });
        });
        // check to make sure players didn't leave before timeout
        if (playerOneExists && playerTwoExists) {
            currentTurnRef.set(1);
        }
    };

    messageSubmit = event => {
        event.preventDefault();

        if (this.message.value !== "") {
            let message = this.message.value


            if (this.state.username === "") {
                chatData.push({
                    name: "Guest",
                    message: message,
                    time: firebase.database.ServerValue.TIMESTAMP,
                    idNum: playerNum,
                });
            } else {
                chatData.push({
                    name: this.state.username,
                    message: message,
                    time: firebase.database.ServerValue.TIMESTAMP,
                    idNum: playerNum,
                });
            }
        }
        this.message.value = ""
    };

    chatDisplay = () => {
        chatData.orderByChild("time").on("child_added", (snapshot) => {

            // If idNum is 0, then its a disconnect message and displays accordingly
            // If not - its a user chat message
            this.setState({
                chat: [...this.state.chat, {
                    name: snapshot.val().name,
                    message: snapshot.val().message,
                    idNum: snapshot.val().idNum,
                    keyId: this.state.chat.length
                }]
            });
            this.chat.scrollTop = this.chat.scrollHeight;
        });

        let cutoff = Date.now() - 24 * 60 * 60 * 1000;
        const old = chatData.orderByChild('time').endAt(cutoff).limitToLast(1);
        old.on('child_added', function (snapshot) {
            snapshot.ref.remove();
        })
    };

    componentDidMount() {

        win.set(null)

        if (this.state.loggedIn === true) {
            this.playerCheck()
        }

        API.signedIn()
            .then(response => {
                console.log(response);
                if (response.data.loggedIn) {
                    this.setState({ loggedIn: true, username: response.data.username, id: response.data.id });
                } else {
                    console.log("No logged in user stored in session");
                }
            });

        this.chatDisplay();

        this.gameSetup();

        this.turnSetup();

        this.winner();
    };

    componentDidUpdate() {
        this.chat.scrollTop = this.chat.scrollHeight;
    };

    render() {

        const whoWon = (winner) => {
            if (winner === "Tie") {
                return (
                    <Animation type="fadeIn">
                        <Img
                            alt="No Winner"
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
                            pt="pt-3"
                            alt="You Won"
                            width="17rem"
                            height="15rem"
                            src="https://i.pinimg.com/originals/51/3b/e4/513be4dbaeb5472f367ab69f42be3460.gif"
                        />
                        <h1>
                            {winner}
                        </h1>
                    </div>
                )
            } else {
                return (
                    <Img
                        alt="RPSLS Online"
                        width="21rem"
                        height="19rem"
                        src="https://codecademy-discourse.s3.amazonaws.com/original/5X/1/e/9/a/1e9ae22826a47a2d2e9f0e8f0f0cdf21a8479715.jpg"
                    />
                )
            }
        }

        const choiceImg = (choice) => {
            if (choice === "Rock") {
                return <Img width="10rem" height="10rem" src={rock} alt="rock" />
            } else if (choice === "Paper") {
                return <Img width="10rem" height="10rem" src={paper} alt="paper" />
            } else if (choice === "Scissors") {
                return <Img width="10rem" height="10rem" src={scissors} alt="scissors" />
            } else if (choice === "Lizard") {
                return <Img width="10rem" height="10rem" src={lizard} alt="Lizard" />
            } else if (choice === "Spock") {
                return <Img width="10rem" height="10rem" src={spock} alt="Spock" />
            }

        }

        return (
            <MDBContainer fluid style={styles.background} onClick={this.clearRefresh}>
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    onIdle={this.onIdle}
                    debounce={250}
                    timeout={1000 * 60} />
                <Header>
                    Rock Paper Scissors Lizard Spock Online
                </Header>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol className="d-flex justify-content-center">
                            {playerNum === null ? (
                                <NameInput
                                    onSubmit={this.nameSubmit}
                                    loggedIn={this.state.loggedIn}
                                    ref={(input) => { this.username = input }}
                                />
                            ) : (<h2 className="text-center">Hi {this.state.username}! You are Player {playerNum}</h2>)
                            }
                        </MDBCol>
                    </MDBRow>
                    <br />
                    <MDBRow>
                        <MDBCol xl="4" className="d-flex justify-content-center my-1" >
                            <div ref={player1 => this.player1 = player1} />
                            <Card style={{ width: "21rem", height: "19rem" }} border={this.state.currentTurn === 1 ? "success" : null}>
                                <CardBody>
                                    <CardTitle className="text-center mb-1">{this.state.playerOne.name}</CardTitle>
                                    <div className="text-center d-flex justify-content-center">
                                        {this.state.currentTurn === 1 && playerNum === 1 ?
                                            (<div>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <Img onClick={() => this.playerChoice("Rock")} width="4rem" height="4rem" src={rock} alt="rock" />
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <Img onClick={() => this.playerChoice("Paper")} width="4rem" height="4rem" src={paper} alt="paper" />
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <Img onClick={() => this.playerChoice("Scissors")} width="4rem" height="4rem" src={scissors} alt="scissors" />
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <Img onClick={() => this.playerChoice("Lizard")} width="4rem" height="4rem" src={lizard} alt="lizard" />
                                                    </MDBCol>
                                                </MDBRow>
                                                <Img onClick={() => this.playerChoice("Spock")} width="4rem" height="4rem" src={spock} alt="spock" />
                                            </div>
                                            ) : null}

                                        {this.state.currentTurn === 2 && playerNum === 1 ?
                                            (<div>
                                                <h2>Opponent's Turn</h2>
                                                <Img width="10rem" height="10rem" src="https://i.redd.it/ounq1mw5kdxy.gif" alt="loading" />
                                            </div>) : null}

                                        {this.state.currentTurn === 3 ? choiceImg(this.state.playerOne.choice) : null}

                                        <div className="outcomes">
                                            <div className="outcome-trackers" id="player1-wins">Wins: {this.state.playerOne.wins} </div>
                                            <div className="outcome-trackers" id="player1-losses"> Losses: {this.state.playerOne.losses}</div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </MDBCol>
                        <MDBCol xl="4" className="d-flex justify-content-center my-1">
                            <div ref={player2 => this.player2 = player2} />
                            <Card className="text-center" style={{ width: "21rem", height: "19rem" }}>
                                {whoWon(this.state.winner)}
                            </Card>
                        </MDBCol>
                        <MDBCol xl="4" className="d-flex justify-content-center my-1" >
                            <Card style={{ width: "21rem", height: "19rem" }} border={this.state.currentTurn === 2 ? "success" : null}>
                                <CardBody>
                                    <CardTitle className="text-center mb-1">{this.state.playerTwo.name}</CardTitle>
                                    <div className="text-center d-flex justify-content-center">
                                        {this.state.currentTurn === 1 && playerNum === 2 ?
                                            (<div>
                                                <h2>Opponent's Turn</h2>
                                                <Img width="10rem" height="10rem" src="https://i.redd.it/ounq1mw5kdxy.gif" alt="loading" />
                                            </div>) : null}

                                        {this.state.currentTurn === 2 && playerNum === 2 ?
                                            (<div>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <Img onClick={() => this.playerChoice("Rock")} width="4rem" height="4rem" src={rock} alt="rock" />
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <Img onClick={() => this.playerChoice("Paper")} width="4rem" height="4rem" src={paper} alt="paper" />
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <Img onClick={() => this.playerChoice("Scissors")} width="4rem" height="4rem" src={scissors} alt="scissors" />
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <Img onClick={() => this.playerChoice("Lizard")} width="4rem" height="4rem" src={lizard} alt="lizard" />
                                                    </MDBCol>
                                                </MDBRow>
                                                <Img onClick={() => this.playerChoice("Spock")} width="4rem" height="4rem" src={spock} alt="spock" />
                                            </div>
                                            ) : null}

                                        {this.state.currentTurn === 3 ? choiceImg(this.state.playerTwo.choice) : null}

                                        <div className="outcomes">
                                            <div className="outcome-trackers" id="player2-wins">Wins: {this.state.playerTwo.wins}</div>
                                            <div className="outcome-trackers" id="player2-losses">Losses: {this.state.playerTwo.losses}</div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </MDBCol>
                    </MDBRow>
                    <ChatMessages
                        chat={this.state.chat}
                        ref={chat => this.chat = chat}
                    >
                        <ChatInput
                            onSubmit={this.messageSubmit}
                            ref={(input) => { this.message = input }}
                        />
                    </ChatMessages>
                </MDBContainer>
            </MDBContainer>
        );
    }

}

export default RPSLSonline;