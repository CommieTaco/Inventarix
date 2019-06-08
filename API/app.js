var express = require('express');
const bodyParser= require('body-parser')

const db = require('./config/database')

var app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json());
app.set('trust proxy', true);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    next();
});

app.get('/', (request, response) => {
  response.json({
      message:"hello world"
  })
})

app.use('/users', require('./routes/user'))

module.exports = app;