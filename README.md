# Reactor RPS

Play the classic Rock-Paper-Scissors (RPS) game, or the more complex version Rock-Paper-Scissors-Lizard-Spock (RPSLS), against CPU, or online two player with a friend. Create an account to keep track of your online win/loss record, and climb the leaderboard to be the best RPS and RPSLS player!! 

![Reactor-RPS Homa Page](https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/Reactor-RPS.png) 


## Single Player
![Reactor-RPS Single Player](https://github.com/ChanRahar/Game-Project/blob/master/Git%20Demo/RPS-Single.gif)

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
