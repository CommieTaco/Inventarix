var MongoClient = require('mongodb').MongoClient

var uri = 'mongodb://localhost:27017'

module.exports = new MongoClient.connect(uri, { useNewUrlParser: true })

