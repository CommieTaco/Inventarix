const mongoose = require('mongoose');

const Categories = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('categories', Categories);