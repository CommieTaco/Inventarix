const mongoose = require('mongoose');

var uri = 'mongodb://localhost:27017/inventarix'

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(uri, { useNewUrlParser: true})
    .then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });