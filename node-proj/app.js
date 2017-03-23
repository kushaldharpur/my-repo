var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('webtechdevops.centralindia.cloudapp.azure.com:51003/lims3');

var MindsData = require('./models/bookModel');
var app = express();

var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = express.Router();

bookRouter.route('/books')
    // .post(function(req, res) {
    //     var book = new Book(req.body);
    //     console.log(book);
    //     res.send(book);
    // })
    .get(function(req, res) {
        Book.find(function(err, books) {
            if (err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    });

app.use('/api', bookRouter);
app.route('/getdata').get(function(req, res, next) {
    MindsData.find()
        .then(function(doc) {
            res.send(doc);
            console.log(doc);
        });
});

app.get('/', function(req, res) {
    res.send('Welcome to API!!!!!');
});

app.listen(port, function() {
    console.log('running on port: ' + port);
});