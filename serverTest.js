/**
 * Created by MarMat89-PC on 06/04/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://marmat89:28mamprenar@ds019480.mlab.com:19480/esn_nosql';
//var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server.");

    var findRestaurants = function(db, callback) {
        var cursor =db.collection('test').find( {MeasureTime : "2016.04.13 06:48:04" });
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
            } else {
                callback();
            }
        });
    };


    findRestaurants(db, function() {
        db.close();
    });




    //console.log(db.collection("logs").aggregate( [
    //    { $project: { tipo: 1, operazioni: 1 } },
    //    { $unwind: "$operazioni" },
    //    { $group: { _id: "$tipo",  sommaOperazioni: { $sum: "$operazioni" } } }
    //]))
});
