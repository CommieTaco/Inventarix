'use strict'

var MongoClient = require('mongodb').MongoClient

var app = require('./app');

var port = 3800;

var url = 'mongodb://localhost:27017/inventarix'
MongoClient.connect(url, { useNewUrlParser: true })
    .then(function (db) { 
        console.log("Conexion establecida con DB")
        console.log(db)
        app.listen(port, () => {
            console.log("servidor corriendo en http://localhost:3800");
        });
    })
    .catch(function (err) {})