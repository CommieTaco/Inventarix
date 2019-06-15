const mongoose = require('mongoose');
const {config} = require('../config')

const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`
<<<<<<< HEAD
console.log(MONGO_URI)
=======
>>>>>>> 712e6a4118f34e68698aaffff6df5d8e2909baa2
//const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(MONGO_URI, { useNewUrlParser: true})
    .then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
