import React, { Component } from "react";
import "./style.css";
import firebase from "../firebase"

const database = firebase.database();
const chatData = database.ref("/chat");
const playersRef = database.ref("players");
const currentTurnRef = database.ref("turn");
let currentPlayers = null;
let currentTurn = null;
let playerNum = false;
let playerOneExists = false;
let playerTwoExists = false;
let playerOneData = null;
let playerTwoData = null;

class RPS extends Component {

    state = {
        username: "Guest",
        message: "",

        chat: []
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


        playersRef.on("value", function (snapshot) {
            console.log(snapshot.child("1").val());
        })

    }



    componentDidUpdate() {

        this.something.scrollTop = this.something.scrollHeight;

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

        if (this.state.username !== "") {
            alert(`Hello ${this.state.username}`);
        }

    };



    chatSubmit = event => {
        event.preventDefault();

        if (this.state.message !== "") {
            chatData.push({
                name: this.state.username,
                message: this.state.message,
                time: firebase.database.ServerValue.TIMESTAMP,
            });
        }
        this.setState({ message: "" })

    }


    render() {
        return (

            <div>
                <header>
                    <h1>Rock Paper Scissors</h1>
                </header>
                Hello {this.state.username}

                <div id="sizer">

                    <div id="swap-zone">
                        <form onSubmit={this.nameSubmit}>

                            <input
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                placeholder="Name"
                            />

                            <button id="start" type="submit">Start</button>
                        </form>
                    </div>

                    <div id="current-turn"></div>

                    <div id="game-div">

                        <div id="player1">
                            <h3 id="player1-name">Player1</h3>
                            <ul>
                            </ul>
                            <div id="player1-chosen"></div>
                            <div className="outcomes">
                                <div className="outcome-trackers" id="player1-wins"></div>
                                <div className="outcome-trackers" id="player1-losses"></div>
                            </div>
                        </div>

                        <div id="result"></div>

                        <div id="player2">
                            <h3 id="player2-name">Player2</h3>
                            <ul>
                            </ul>
                            <div id="player2-chosen"></div>
                            <div className="outcomes">
                                <div className="outcome-trackers" id="player2-wins"></div>
                                <div className="outcome-trackers" id="player2-losses"></div>
                            </div>
                        </div>

                    </div>


                    <div id="chat">

                        <div id="chat-messages" ref={node => this.something = node}>
                            {this.state.chat.map(line => (
                                <p className="something"><span>{line.name}</span>: {line.message}</p>
                            ))}
                        </div>
                        <div id="chat-bar">
                            <form onSubmit={this.chatSubmit}>
                                <input id="chat-input"
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.handleInputChange}
                                    placeholder="Name" />
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