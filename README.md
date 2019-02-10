# Reactor RPS

A mobile responsive web application that let users play the classic Rock-Paper-Scissors (RPS) game, or Rock-Paper-Scissors-Lizard-Spock (RPSLS), against CPU or online two players. While in online two players game, players can chat and communicate with one another, and anyone else spectating their match. Users can also create an account to keep track of their online wins and losses, and compete with other accounts to climb the leaderboard.

Try the game here: http://reactor-rps.herokuapp.com/

![Reactor-RPS Homa Page](https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/Reactor-RPS.png) 

## RPS Single Player
<p align="center">
<img  src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/RPS-Single.gif">
</p>

## RPS Online Two Player
<p align="center">
<img src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/RPS-Online.gif">
</p>

## RPSLS Single Player
<p align="center">
<img  src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/RPS-Single.gif">
</p>

## RPSLS Online Two Player
<p align="center">
<img src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/RPSLS-Online.gif">
</p>

## User Authentication
Account creation and authentication are handled by Passport.js. Password saved are encrypted before stored in MongoDB database. 

* Create an Account
<p align="center">
<img  src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/Sign-Up.gif">
</p>

* Sign In and Sign Out
<p align="center">
<img src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/Sign-In-Out.gif">
</p>

* Password Reset and Sign In with New Password
<p align="center">
<img src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/Pass-Reset.gif">
</p>

## Leader Board
The Leader Board ranked accounts based on the net wins and losses, which shows when the page load. The Leader Board table can be sorted based on the header, and a user can search a username on the search box.
<p align="center">
<img src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/Leader-Board.gif">
</p>

## Tech/framework used

<b>Built with</b>
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Passport](http://www.passportjs.org/)
- [Firebase](https://firebase.google.com/)
- [MDB React](https://mdbootstrap.com/docs/react/)

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm i
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm i
```

This game uses firebase for the game database. You need to create an apiKey file in the src folder with your firebase information, or saved them in the environmental variables, to start the application locally.

Your app should now be running on <http://localhost:8800>. The Express server should intercept any AJAX requests from the client.

