const mongoose = require('mongoose');

const Articles = mongoose.Schema({
    name: String,
    description: String,
    price: String,
    url: String
}, {
    timestamps: true
});

module.exports = mongoose.model('articles', Articles);