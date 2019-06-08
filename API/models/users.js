const mongoose = require('mongoose');

const Users = mongoose.Schema({
    username: String,
    password: String,
    name: String,
    lastname: String
}, {
    timestamps: true
});

module.exports = mongoose.model('users', Users);