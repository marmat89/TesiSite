/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var bodyParser = require('body-parser');

var http = require('http');
var path = require('path');

var app = express();
var DB = "test"
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var BSON = require('bson');
var assert = require('assert');
var url = 'mongodb://marmat89:28mamprenar@ds019480.mlab.com:19480/esn_nosql';


// all environments
app.set('port', process.env.PORT || 3100);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({type: 'application/*+json'}))
var jsonParser = bodyParser.json()

// development only
if ('development' == app.get('env')) {
}

app.get('/', routes.index);
app.get('/users', user.list);


// TEMPLATE
var about = require('./routes/about');
var monitor = require('./routes/monitor');
var chart = require('./routes/chart');
var esnmap = require('./routes/esnmap');

app.get('/about', about.about);
app.get('/monitor', monitor.monitor);
app.get('/chart', chart.chart);
app.get('/esnmap', esnmap.esnmap);

// GET CALL
app.get('/UploadIMGTest', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server for GetSensorList");        var findRestaurants = function (db, callback) {
            var fs = require("fs");
            var image_origial = "stationUploadIMG/placeholder_station.jpg";
            var base64Image
            fs.readFile(image_origial, 'binary', function(err, original_data){
                fs.writeFile('image_orig.png', original_data, 'binary', function(err) {});
                base64Image = new Buffer(original_data, 'binary').toString('base64');
                console.log("base64 str:");
                console.log(base64Image);
                console.log(base64Image.length);
                db.collection("Station").insert({
                    'StationID':1,
                    'StationName':"AirStationCesenaMontalti",
                    'StationPositionLat' : 44.1404,
                    'StationPositionLon' : 12.24431,
                    'StationDescription':"",
                    'StationDebugger':false,
                    'StationDebuggerType':[],
                    'binary':new BSON.Binary(base64Image)
                }
                    , function(err, doc) {
                    });

            });

    };
    findRestaurants(db, function () {
        db.close();
    });
    });
});
app.get('/GetSensorList', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server for GetSensorList");
        var findRestaurants = function (db, callback) {
            var cursor = db.collection(DB).aggregate([
                {$match: {}},
                {$group: {_id: "$SensorName", measureNumber: {$sum: 1}}}
            ])
            var items = [];
            cursor.on('data', function (data) {

                items.push(data);

            });
            cursor.on('end', function () {
                if (items != null) {
                    console.dir(items);
                    res.json(items)
                } else {
                    callback();
                }
            });

        };
        findRestaurants(db, function () {
            db.close();
        });
    });
});
app.get('/GetStationList', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server for GetStationList");
        var findRestaurants = function (db, callback) {
            var cursor = db.collection(DB).aggregate([
                {$match: {}},
                {
                    $group: {
                        _id: "$StationID",
                        name: {$first: '$StationName'},
                        lat: {$first: '$StationPositionLat'},
                        lon: {$first: '$StationPositionLon'},
                        measureNumber: {$sum: 1}
                    }
                }
            ])
            var items = [];
            cursor.on('data', function (data) {
                items.push(data);

            });
            cursor.on('end', function () {
                res.json(items)
            });

        };
        findRestaurants(db, function () {
            db.close();
        });
    });
});
app.get('/GetDataTypeList', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server for GetDataTypeList");
        var findRestaurants = function (db, callback) {
            var cursor = db.collection(DB).aggregate([
                {$match: {}},
                {$group: {_id: "$SensorDataType", measureNumber: {$sum: 1}}}
            ])
            var items = [];
            cursor.on('data', function (data) {
                items.push(data);

            });
            cursor.on('end', function () {
                res.json(items)
            });

        };
        findRestaurants(db, function () {
            db.close();
        });
    });
});
app.get('/allMeasure', function (req, res) {
    console.log("GET => allMeasure :: from " + req.rawHeaders + "client");
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server " + DB + "::allMeasure");

        var findRestaurants = function (db, callback) {
            var array = new Array();
            //var cursor =db.collection(DB).find( {});
            var cursor = db.collection('test').find().sort({MeasureTime: -1}).limit(100);
            cursor.each(function (err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    array.push(doc);
                } else {
                    callback(array);
                }
            });
        };
        findRestaurants(db, function (data) {
            res.json(data);
            console.log("Logout correctly from " + DB + "::allMeasure");
            db.close();

        });
    });
});

// POST CALL
app.post('/stationMeasure', jsonParser, function (request, response) {
    var req = request.body;
    console.log("POST => stationMeasure :: from " + request.rawHeaders + "client");
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server " + DB + "::stationMeasure");
        var findRestaurants = function (db, callback) {
            var array = new Array();
            var cursor = db.collection('test').find({StationID: req.id}).sort({MeasureTime: -1}).limit(100)
            cursor.each(function (err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    array.push(doc);
                } else {
                    callback(array);
                }
            });
        };
        findRestaurants(db, function (data) {
            response.json(data);
            console.log("Logout correctly from " + DB + "::stationMeasure");
            db.close();
        });
    });
});
// POST CALL
app.post('/stationInfo', jsonParser, function (request, response) {
    var req = request.body;
    console.log("POST => stationInfo :: from " + request.rawHeaders + "client");
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server " + 'Station' + "::stationInfo");
        var findRestaurants = function (db, callback) {
            var array = new Array();
            var cursor = db.collection('Station').find({"_id": mongo.ObjectID(req.id)})
            cursor.each(function (err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    array.push(doc);
                } else {
                    callback(array);
                }
            });
        };
        findRestaurants(db, function (data) {
            response.json(data);
            console.log("Logout correctly from " + DB + "::stationInfo");
            db.close();
        });
    });
});

app.post('/stationLastMeasure', jsonParser, function (request, response) {
    var req = request.body;
    console.log("POST => stationLastMeasure :: from " + request.rawHeaders + "client");
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server " + DB + "::stationLastMeasure");
        var findRestaurants = function (db, callback) {
            var array = new Array();
            var cursor = db.collection('test').aggregate(
                [
                    {$match: {StationID: req.id}},
                    {$sort: {MeasureTime: -1}},
                    {
                        $group: {
                            _id: "$SensorName",
                            StationName: {$first: '$StationName'},
                            StationID: {$first: '$StationID'},
                            StationPositionLat: {$first: '$StationPositionLat'},
                            StationPositionLon: {$first: '$StationPositionLon'},
                            SensorName: {$first: '$SensorName'},
                            SensorDataType: {$first: '$SensorDataType'},
                            SensorValue: {$first: '$SensorValue'},
                            SensorUOM: {$first: '$SensorUOM'},
                            MeasureTime: {$first: '$MeasureTime'}
                        }
                    }
                ]
            )
            cursor.each(function (err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    array.push(doc);
                } else {
                    callback(array);
                }
            });
        };
        findRestaurants(db, function (data) {
            response.json(data);
            console.log("Logout correctly from " + DB + "::stationMeasure");
            db.close();
        });
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
