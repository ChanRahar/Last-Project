# Reactor RPS

A mobile responsive web application that let users play the classic Rock-Paper-Scissors (RPS) game, or Rock-Paper-Scissors-Lizard-Spock (RPSLS), the more complex version of the regular RPS game, against CPU or online two players. Users can create an account to keep track of their online wins and losses, and compete with each other to be number one on the leaderboard.

![Reactor-RPS Homa Page](https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/Reactor-RPS.png) 


## RPS Single Player
<p align="center">
<img src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/RPS-Single.gif">
</p>
## RPS Online Two Player
<p align="center">
<img src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/RPS-Online.gif">
</p>

## RPSLS Online Two Player
<p align="center">
<img src="https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/RPSLS-Online.gif">
</p>


Try the game here: http://reactor-rps.herokuapp.com/

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

This game uses firebase for the game database. You need to create an apiKey file in the src folder with your firebase information to start the application locally.

Your app should now be running on <http://localhost:8800>. The Express server should intercept any AJAX requests from the client.

