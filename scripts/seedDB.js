const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/game-userdb"
);

const userSeed = [
  {
    username: "admin",
    email: "somethin@some.com",
    password: "password",
    wins: 5,
    losses: 3,
    net: 2
  },
  {
    username: "adminss",
    email: "somethin@somesss.com",
    password: "password",
    wins: 5,
    losses: 2,
    net: 3
  },
  {
    username: "admasdasdin",
    email: "somethin@somesadasd.com",
    password: "password",
    wins: 5,
    losses: 1,
    net: 4
  },
  {
    username: "aw3qedfdmin",
    email: "somethin@somqrwerfe.com",
    password: "password",
    wins: 5,
    losses: 0,
    net: 5
  },
  {
    username: "6354354admin",
    email: "somethin@so654654me.com",
    password: "password",
    wins: 5,
    losses: 5,
    net: 0
  },
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
