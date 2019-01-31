# Reactor RPS

![Reactor-RPS Homa Page](https://github.com/ChanRahar/Game-Project/blob/master/client/public/images/Reactor-RPS.png)

This web game is a take on the classic Rock Paper Scissors (RPS) game. If you have no one to play with, you can play single player against CPU. If you have a friend to play with, you can play online with your friend. The game equip with build in chat, so you can communicate with your opponent, or with anyone else on the page. 

You can also create an account, which will keep track of your winning and losing, and your account will be automatically listed on the leaderboard. 

If classic RPS is too mundane for you and your friend, you can try the more advance version of Rock Paper Scissors Lizard Spock (RPSLS), which adds complexity to the classic RPS game.

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
