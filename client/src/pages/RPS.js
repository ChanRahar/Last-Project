import React, { Component } from "react";
import "./style.css";
import firebase from "../firebase"
import API from "../utils/API"

const database = firebase.database();
const chatData = database.ref("/chat");
const playersRef = database.ref("players");
const currentTurnRef = database.ref("turn");
const win = database.ref("win");
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
    currentPlayer: {
        border: "2px solid yellow"
    },
    waitingPlayer: {
        border: "1px solid black"
    }
}

class RPS extends Component {

    state = {
        username: "",
        chat: [],
        currentTurn: null,
        winner: "",
        loggedIn: false,


        playerOne: {
            name: "Waiting for Player 1",
            wins: 0,
            losses: 0,
            active: false
        },

        playerTwo: {
            name: "Waiting for Player 2",
            wins: 0,
            losses: 0,
            active: false
        }


    }

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

    }


    componentDidMount() {

        API.signedIn()
            .then(response => {
                console.log(response);
                if (response.data.loggedIn) {
                    this.setState({ loggedIn: true, username: response.data.username });
                } else {
                    console.log("No logged in user stored in session");
                }
            });

        this.chatDisplay();

        console.log("Mounted")

        win.set(null)

        win.on("value", snapshot => {

            this.setState({ winner: snapshot.val() });
        });

        playersRef.on("value", (snapshot) => {

            // length of the 'players' array
            currentPlayers = snapshot.numChildren();

            // Check to see if players exist
            playerOneExists = snapshot.child("1").exists();
            playerTwoExists = snapshot.child("2").exists();

            // Player data objects
            playerOneData = snapshot.child("1").val();
            playerTwoData = snapshot.child("2").val();

            console.log(playerOneData)
            // If theres a player 1, fill in name and win loss data
            if (playerOneExists) {
                this.setState({
                    playerOne: {
                        name: playerOneData.name,
                        wins: playerOneData.wins,
                        losses: playerOneData.losses
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
                        losses: playerTwoData.losses
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


        playersRef.on("child_added", function (snapshot) {

            if (currentPlayers === 1) {

                // set turn to 1, which starts the game
                currentTurnRef.set(1);
            }
        });

        currentTurnRef.on("value", (snapshot) => {

            // Gets current turn from snapshot
            this.setState({ currentTurn: snapshot.val() });

            console.log(this.state.currentTurn)

            // Don't do the following unless you're logged in
            if (playerNum) {

                console.log(playerNum)

                if (this.state.currentTurn === 3) {

                    // Where the game win logic takes place then resets to turn 1
                    this.gameLogic(playerOneData.choice, playerTwoData.choice);



                    //  reset after timeout
                    const moveOn = () => {

                        win.set(null)

                        win.on("value", snapshot => {

                            this.setState({ winner: snapshot.val() });
                        });
                        // check to make sure players didn't leave before timeout
                        if (playerOneExists && playerTwoExists) {
                            currentTurnRef.set(1);
                        }
                    };

                    //  show results for 2 seconds, then resets
                    setTimeout(moveOn, 1000 * 3);
                }

            }
        });
        this.winner();
    }

    winner = () => {
        win.on("value", snapshot => {

            this.setState({ winner: snapshot.val() });
            console.log(this.state.winner);
        });

    }

    componentDidUpdate() {
        this.chat.scrollTop = this.chat.scrollHeight;
    }

    getInGame = () => {

        // For adding disconnects to the chat with a unique id (the date/time the user entered the game)
        // Needed because Firebase's '.push()' creates its unique keys client side,
        // so you can't ".push()" in a ".onDisconnect"
        let chatDataDisc = database.ref("/chat/" + Date.now());

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
            playerRef = database.ref("/players/" + playerNum);

            // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
            playerRef.set({
                name: username,
                wins: 0,
                losses: 0,
                choice: null
            });

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
    }

    playerOneWon = () => {

        win.set(playerOneData.name)

        playersRef.child("1").child("wins").set(playerOneData.wins + 1);
        playersRef.child("2").child("losses").set(playerTwoData.losses + 1);

    };

    playerTwoWon = () => {

        win.set(playerTwoData.name)

        playersRef.child("2").child("wins").set(playerTwoData.wins + 1);
        playersRef.child("1").child("losses").set(playerOneData.losses + 1);

    };

    tie = () => {
        win.set("Tie")
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
        else if (player1choice === "Rock" && player2choice === "Paper") {
            this.playerTwoWon();
        }
        else if (player1choice === "Rock" && player2choice === "Scissors") {
            this.playerOneWon();
        }
        else if (player1choice === "Paper" && player2choice === "Rock") {
            this.playerOneWon();
        }
        else if (player1choice === "Paper" && player2choice === "Scissors") {
            this.playerTwoWon();
        }
        else if (player1choice === "Scissors" && player2choice === "Rock") {
            this.playerTwoWon();
        }
        else if (player1choice === "Scissors" && player2choice === "Paper") {
            this.playerOneWon();
        }

    }



    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    nameSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        if (this.username.value === "" && this.state.username === "") {
            alert("Please Enter Name");
        }
        else if (this.state.username !== "" && this.username.value === "") {
            username = this.state.username

            this.getInGame();
        }
        else if (this.username.value !== "") {

            let chosenName = capitalize(this.username.value)

            username = chosenName

            this.setState({ username: chosenName });

            this.getInGame();
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
                return <h1>{winner} Game!!!</h1>;
            } else if (winner !== null) {
                return <h1>{winner} Win!!!</h1>;
            } else {
                return null
            }
        }

        // const startDisplay = () => {
        //     if (this.state.loggedIn === true) {
        //         return <form onSubmit={this.nameSubmit}>
        //             <button id="start" type="submit">Start</button>
        //         </form>;
        //     } else if (playerNum === null) {
        //         return <form onSubmit={this.nameSubmit}>

        //         <input
        //             id="username"
        //             name="username"
        //             ref={(input) => { this.username = input }}
        //             type="input"
        //             placeholder="Name"
        //         />

        //         <button id="start" type="submit">Start</button>
        //     </form>;
        //     } else {
        //         return <h2>Hi {this.state.username}! You are Player {playerNum}</h2>
        //     }
        // }

        return (
            <div>
                <header>
                    <h1>Rock Paper Scissors</h1>
                </header>
                <div id="sizer">

                    <div id="swap-zone">
                        {playerNum === null ? (
                            <form onSubmit={this.nameSubmit}>

                                <input className= {this.state.loggedIn === true? "invisible": "visible"}
                                    id="username"
                                    name="username"
                                    ref={(input) => { this.username = input }}
                                    type="input"
                                    placeholder="Name"
                                />

                                <button id="start" type="submit">Start</button>
                            </form>
                        ) : (<h2>Hi {this.state.username}! You are Player {playerNum}</h2>)}
                        {/* {startDisplay()} */}
                    </div>

                    <div id="current-turn">

                    </div>


                    <div id="game-div">

                        <div id="player1" style={this.state.currentTurn === 1 ? styles.currentPlayer : styles.waitingPlayer}>
                            <h3 id="player1-name">{this.state.playerOne.name}</h3>
                            {this.state.currentTurn === 1 && playerNum === 1 ?
                                (<ul>
                                    <li onClick={() => this.playerChoice("Rock")}>Rock</li>
                                    <li onClick={() => this.playerChoice("Paper")}>Paper</li>
                                    <li onClick={() => this.playerChoice("Scissors")}>Scissors</li>
                                </ul>) : ""}

                            <div id="player1-chosen">
                                {this.state.currentTurn === 3 ? playerOneData.choice : null}
                            </div>

                            <div className="outcomes">
                                <div className="outcome-trackers" id="player1-wins">Wins: {this.state.playerOne.wins} </div>
                                <div className="outcome-trackers" id="player1-losses"> Losses: {this.state.playerOne.losses}</div>
                            </div>
                        </div>

                        <div id="result">
                            {whoWon(this.state.winner)}
                        </div>

                        <div id="player2" style={this.state.currentTurn === 2 ? styles.currentPlayer : styles.waitingPlayer}>
                            <h3 id="player2-name">{this.state.playerTwo.name}</h3>
                            {this.state.currentTurn === 2 && playerNum === 2 ?
                                (<ul>
                                    <li onClick={() => this.playerChoice("Rock")}>Rock</li>
                                    <li onClick={() => this.playerChoice("Paper")}>Paper</li>
                                    <li onClick={() => this.playerChoice("Scissors")}>Scissors</li>
                                </ul>) : null}
                            <div id="player2-chosen">
                                {this.state.currentTurn === 3 ? playerTwoData.choice : null}
                            </div>
                            <div className="outcomes">
                                <div className="outcome-trackers" id="player2-wins">Wins: {this.state.playerTwo.wins}</div>
                                <div className="outcome-trackers" id="player2-losses">Losses: {this.state.playerTwo.losses}</div>
                            </div>
                        </div>

                    </div>


                    <div id="chat">

                        <div id="chat-messages" ref={chat => this.chat = chat}>
                            {this.state.chat.map(line => (
                                <p className={'line-chat player' + line.idNum} key={line.keyId}><span>{line.name}</span>: {line.message}</p>
                            ))}
                        </div>

                        <div id="chat-bar">
                            <form onSubmit={this.messageSubmit}>
                                <input id="chat-input"
                                    name="message"
                                    ref={(input) => { this.message = input }}
                                    type="input" />
                                <button id="chat-send" type="submit">Send</button>
                            </form >
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default RPS;