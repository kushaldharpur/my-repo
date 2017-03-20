var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('webtechdevops.centralindia.cloudapp.azure.com:51003/lims3');
var Schema = mongoose.Schema;

var mindsDataSchema = new Schema({
    name: { type: String, required: true },
    mid: String,
    track: String
}, { collection: 'minds-data' });

var MindsData = mongoose.model('MindsData', mindsDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/get-data', function(req, res, next) {
    MindsData.find()
        .then(function(doc) {
            res.render('index', { items: doc });
        });
});

router.post('/insert', function(req, res, next) {
    var item = {
        name: req.body.name,
        mid: req.body.mid,
        track: req.body.track
    };

    var data = new MindsData(item);
    data.save();

    res.redirect('/get-data');
});

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    MindsData.findByIdAndRemove(id).exec();
    res.redirect('/get-data');
});

router.post('/update', function(req, res, next) {
    var id = req.body.id;

    MindsData.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
        }
        doc.name = req.body.name;
        doc.mid = req.body.mid;
        doc.track = req.body.track;
        doc.save();
    })
    res.redirect('/get-data');
});

module.exports = router;