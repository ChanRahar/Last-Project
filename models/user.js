const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    win: {
        type: Number,
        default: 0
    },
    lost: {
        type: Number,
        default: 0
    },
});

const User = mongoose.model("User", userSchema);

User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;