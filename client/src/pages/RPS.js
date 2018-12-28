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
let currentTurn = null;
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
        playerOne: {
            name: "Waiting for Player 1",
            wins: 0,
            losses: 0
        },
        playerTwo: {
            name: "Waiting for Player 2",
            wins: 0,
            losses: 0
        }
    }

    componentDidMount() {
        chatData.orderByChild("time").on("child_added", (snapshot) => {

            // If idNum is 0, then its a disconnect message and displays accordingly
            // If not - its a user chat message
            // $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
            // + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");

            this.setState({ chat: [...this.state.chat, { name: snapshot.val().name, message: snapshot.val().message }] });
            this.something.scrollTop = this.something.scrollHeight;
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

    }

    componentDidUpdate() {
        this.something.scrollTop = this.something.scrollHeight;

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
                    idNum: playerNum
                });
            } else {
                chatData.push({
                    name: this.state.username,
                    message: message,
                    time: firebase.database.ServerValue.TIMESTAMP,
                    idNum: playerNum
                });
            }
        }
        this.message.value = ""
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

                    <div id="current-turn"></div>

                    <div id="game-div">

                        <div id="player1">
                            <h3 id="player1-name">{this.state.playerOne.name}</h3>
                            <ul>
                            </ul>
                            <div id="player1-chosen"></div>
                            <div className="outcomes">
                                <div className="outcome-trackers" id="player1-wins">Wins: {this.state.playerOne.wins}</div>
                                <br></br>
                                <div className="outcome-trackers" id="player1-losses">Losses: {this.state.playerOne.losses}</div>
                            </div>
                        </div>

                        <div id="result"></div>

                        <div id="player2">
                            <h3 id="player2-name">{this.state.playerTwo.name}</h3>
                            <ul>
                            </ul>
                            <div id="player2-chosen"></div>
                            <div className="outcomes">
                                <div className="outcome-trackers" id="player2-wins">Wins: {this.state.playerTwo.wins}</div>
                                <br></br>
                                <div className="outcome-trackers" id="player2-losses">Losses: {this.state.playerTwo.losses}</div>
                            </div>
                        </div>

                    </div>


                    <div id="chat">

                        <div id="chat-messages" ref={node => this.something = node}>
                            {this.state.chat.map(line => (
                                <p className="line-chat"><span>{line.name}</span>: {line.message}</p>
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