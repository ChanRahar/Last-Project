import React, { Component } from "react";
import "./style.css";
import firebase from "../firebase"

const database = firebase.database();
const chatData = database.ref("/chat");
const playersRef = database.ref("players");
const currentTurnRef = database.ref("turn");
let playerRef = "";
let currentPlayers = null;
let username = ""
// let currentTurn = null;
let playerNum = null;
let playerOneExists = false;
let playerTwoExists = false;
let playerOneData = null;
let playerTwoData = null;
let playerOneActive = false;
let playerTwoActive = false

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

    componentDidMount() {

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
            this.setState({currentTurn : snapshot.val()});

            console.log(this.state.currentTurn)

            // Don't do the following unless you're logged in
            if (playerNum) {

                console.log(playerNum)

                // For turn 1
                if (this.state.currentTurn === 1) {

                    playerOneActive = true

                    console.log(this.state.playerOne.active)

                    // $("#player" + playerNum + " ul").append("<li>Rock</li><li>Paper</li><li>Scissors</li>");
                }

                else if (this.state.currentTurn === 2) {

                    playerOneActive = false;
                    playerTwoActive = true

                    // $("#player" + playerNum + " ul").append("<li>Rock</li><li>Paper</li><li>Scissors</li>");
                } 

                // else if (this.state.currentTurn === 3) {

                //     // Where the game win logic takes place then resets to turn 1
                //     gameLogic(playerOneData.choice, playerTwoData.choice);

                //     // reveal both player choices
                //     $("#player1-chosen").text(playerOneData.choice);
                //     $("#player2-chosen").text(playerTwoData.choice);

                //     //  reset after timeout
                //     var moveOn = function () {

                //         $("#player1-chosen").empty();
                //         $("#player2-chosen").empty();
                //         $("#result").empty();

                //         // check to make sure players didn't leave before timeout
                //         if (playerOneExists && playerTwoExists) {
                //             currentTurnRef.set(1);
                //         }
                //     };

                //     //  show results for 2 seconds, then resets
                //     setTimeout(moveOn, 2000);
                // }

                // else {

                //     //  if (playerNum) {
                //     //    $("#player" + playerNum + " ul").empty();
                //     //  }
                //     $("#player1 ul").empty();
                //     $("#player2 ul").empty();
                //     $("#current-turn").html("<h2>Waiting for another player to join.</h2>");
                //     $("#player2").css("border", "1px solid black");
                //     $("#player1").css("border", "1px solid black");
                // }
            }
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

        if (this.username.value !== "") {

            let chosenName = capitalize(this.username.value)

            username = chosenName

            this.setState({ username: chosenName })
        }
        this.getInGame();
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

    changeDimension(e) {

        let clickChoice = e.currentTarget.innerHTML;

        playerRef.child("choice").set(clickChoice);

        currentTurnRef.transaction((turn) => {
            return turn + 1;

        });
    }


    render() {
        return (
            <div>
                <header>
                    <h1>Rock Paper Scissors</h1>
                </header>
                <div id="sizer">

                    <div id="swap-zone">
                        {playerNum === null ? (
                            <form onSubmit={this.nameSubmit}>

                                <input
                                    id="username"
                                    name="username"
                                    ref={(input) => { this.username = input }}
                                    type="input"
                                    placeholder="Name"
                                />

                                <button id="start" type="submit">Start</button>
                            </form>
                        ) : (<h2>Hi {this.state.username}! You are Player {playerNum}</h2>)}
                    </div>

                    <div id="current-turn">

                    </div>


                    <div id="game-div">

                        <div id="player1" style={this.state.currentTurn === 1 ? styles.currentPlayer : styles.waitingPlayer}>
                            <h3 id="player1-name">{this.state.playerOne.name}</h3>
                            {this.state.currentTurn === 1 && playerNum === 1 ?
                                (<ul>
                                    <li onClick={this.changeDimension}>Rock</li>
                                    <li onClick={this.changeDimension}>Paper</li>
                                    <li onClick={this.changeDimension}>Scissors</li>
                                </ul>) : ""}

                            <div id="player1-chosen">

                            </div>

                            <div className="outcomes">
                                <div className="outcome-trackers" id="player1-wins">Wins: {this.state.playerOne.wins} </div>
                                <div className="outcome-trackers" id="player1-losses"> Losses: {this.state.playerOne.losses}</div>
                            </div>
                        </div>

                        <div id="result"></div>

                        <div id="player2" style={this.state.currentTurn === 2 ? styles.currentPlayer : styles.waitingPlayer}>
                            <h3 id="player2-name">{this.state.playerTwo.name}</h3>
                            {this.state.currentTurn === 2 && playerNum === 2 ?
                                (<ul>
                                    <li onClick={this.changeDimension}>Rock</li>
                                    <li onClick={this.changeDimension}>Paper</li>
                                    <li onClick={this.changeDimension}>Scissors</li>
                                </ul>) : null}
                            <div id="player2-chosen"></div>
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