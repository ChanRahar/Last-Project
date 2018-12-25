import React, { Component } from "react";
import "./style.css";
import firebase from "../firebase"

class RPS extends Component {
    state = {
        username: "",
        currentPlayers: null,
        currentTurn: null,
        playerNum: false,
        playerOneExists: false,
        playerTwoExists: false,
        playerOneData: null,
        playerTwoData: null
    }

    componentDidMount() {
        let database = firebase.database();

        const chatData = database.ref("/chat");

        const playersRef = database.ref("players");

        const currentTurnRef = database.ref("turn");

        playersRef.on("value", function(snapshot) {
        console.log(snapshot.child("1").val());
        })
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        if (this.state.username !== "") {
            alert(`Hello ${this.state.username}`);
            this.setState({
                username: ""
            });
        }

    };

    render() {
        return (

            <div>
                <header>
                    <h1>Rock Paper Scissors</h1>
                </header>
                Hello {this.state.username}

                <div id="sizer">

                    <div id="swap-zone">
                        <form onSubmit={this.handleFormSubmit}>

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
                        <div id="chat-messages"></div>
                        <div id="chat-bar">
                            <input id="chat-input" />
                            <button id="chat-send">Send</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default RPS;