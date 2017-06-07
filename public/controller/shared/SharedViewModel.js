/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Sorter.ts" />
/// <reference path="../shared/IStation.ts" />
/// <reference path="../shared/IAggregationList.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/CallURL.ts" />
/// <reference path="../../js/jquery/jquery.d.ts" />
/// <reference path="../../js/knockout/knockout.d.ts" />" />
var monitor;
(function (monitor) {
    var SharedViewModel = (function () {
        function SharedViewModel() {
            var my = this;
            my.URL = ko.observable(new monitor.CallURL());
            my.measureList = ko.observableArray([]);
            my.sensorList = ko.observableArray([]);
            my.filteredListObservable = ko.observableArray([]);
            my.stationList = ko.observableArray([]);
            my.typeList = ko.observableArray([]);
            my.currentSensor = ko.observable(null);
            my.currentMeasure = ko.observable(null);
            my.setCurrentMeasure = function (measure) { return function () {
                my.currentMeasure(measure);
            }; };
            my.currentStation = ko.observable(null);
            my.setCurrentStation = function (station) { return function () {
                my.stationList().forEach(function (x) {
                    if (x.StationID == station.StationID)
                        my.currentStation(x);
                });
            }; };
            my.setFilterSensorCondition = function (filter) { return function () {
                my.filteredListObservable.removeAll();
                my.currentSensor = ko.observable(null);
                if (filter == "")
                    my.measureList().forEach(function (x) {
                        my.filteredListObservable.push(x);
                    });
                else
                    my.measureList().forEach(function (x) {
                        if (x.sensor.SensorName == filter) {
                            my.currentSensor(x.sensor);
                            my.filteredListObservable.push(x);
                        }
                    });
            }; };
            my.setFilterTypeCondition = function (filter) { return function () {
                my.filteredListObservable.removeAll();
                my.currentSensor = ko.observable(null);
                if (filter == "")
                    my.measureList().forEach(function (x) {
                        my.filteredListObservable.push(x);
                    });
                else
                    my.measureList().forEach(function (x) {
                        if (x.sensor.DataType == filter)
                            my.filteredListObservable.push(x);
                    });
            }; };
            my.getStationInfo = function (url, id) {
                var body = JSON.stringify({ "id": id });
                my.currentSensor = ko.observable(null);
                my.currentMeasure(null);
                my.getSationAsync(my.URL().httpServerURL + url, body, function (xhttp) {
                    console.log(xhttp.responseText);
                    var res = JSON.parse(xhttp.responseText);
                    res.forEach(function (x) {
                        my.stationList().forEach(function (y) {
                            if (y.StationID == x._id)
                                y.update(x.StationDescription, x.StationDebugger, x.StationDebuggerType, x.StationImage);
                        });
                    });
                });
            };
            my.getStationMeasure = function (url, id, callback) { return function () {
                var body = JSON.stringify({ "id": id });
                my.currentSensor = ko.observable(null);
                my.currentMeasure(null);
                my.getSationAsync(my.URL().httpServerURL + url, body, function (xhttp) {
                    console.log(xhttp.responseText);
                    var res = JSON.parse(xhttp.responseText);
                    callback(res);
                });
            }; };
            //carica dati stazioni
            this.getAllAsync(my.URL().httpServerURL + "GetStationList", function (xhttp) {
                console.log(xhttp.responseText);
                var res = JSON.parse(xhttp.responseText);
                my.stationList.removeAll();
                var i = 0;
                res.forEach(function (x) {
                    my.stationList.push(new monitor.Station(x._id, x.name, x.lat, x.lon, x.measureNumber));
                    my.getStationInfo(my.URL().httpPostStationInfo, x._id);
                    i++;
                });
                my.updateSensorList();
                my.updateDataTypeList();
            });
        }
        SharedViewModel.prototype.updateSensorList = function () {
            var my = this;
            my.sensorList.removeAll();
            my.measureList().forEach(function (x) {
                var find = false;
                my.sensorList().forEach(function (y) {
                    if (x.sensor.SensorName == y.SensorName) {
                        find = true;
                    }
                });
                if (!find) {
                    my.sensorList.push({
                        SensorID: 1,
                        SensorName: x.sensor.SensorName,
                        SensorUOM: ""
                    });
                }
            });
        };
        SharedViewModel.prototype.updateDataTypeList = function () {
            var my = this;
            my.typeList.removeAll();
            my.measureList().forEach(function (x) {
                var find = false;
                my.typeList().forEach(function (y) {
                    if (x.sensor.DataType == y) {
                        find = true;
                    }
                });
                if (!find) {
                    my.typeList.push(x.sensor.DataType);
                }
            });
        };
        SharedViewModel.prototype.getAllAsync = function (url, callback) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    callback(xhttp);
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        };
        SharedViewModel.prototype.getSationAsync = function (url, data, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    callback(xhr);
                }
            };
            xhr.send(data);
        };
        return SharedViewModel;
    })();
    monitor.SharedViewModel = SharedViewModel;
})(monitor || (monitor = {}));
//# sourceMappingURL=SharedViewModel.js.map