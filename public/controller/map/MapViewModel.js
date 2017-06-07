/**
 * Created by MarMat89-PC on 14/04/2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../js/googlemaps/google.maps.d.ts" />
/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Measure.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/SharedViewModel.ts" />
var monitor;
(function (monitor) {
    var MapViewModel = (function (_super) {
        __extends(MapViewModel, _super);
        function MapViewModel(mapDiv) {
            var _this = this;
            _super.call(this);
            var my = this;
            //navigator.geolocation.getCurrentPosition((position:any)=> {
            //    this.options = {
            //        zoom: 16,
            //        center: {lat: position.coords.latitude, lng: position.coords.longitude}
            //    };
            //    this.map = new google.maps.Map(mapDiv, this.options);
            //    this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN)
            //});
            this.options = {
                zoom: 16,
                center: { lat: 44.1404, lng: 12.24431 }
            };
            this.map = new google.maps.Map(mapDiv, this.options);
            this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
            this.setCenter = function () { return function () {
                my.map.setCenter({
                    lat: my.currentStation().StationPositionLat,
                    lng: my.currentStation().StationPositionLon
                });
            }; };
            my.getStationLastMeasure = function (url, id) { return function () {
                var body = JSON.stringify({ "id": id });
                my.getSationAsync(my.URL().httpServerURL + url, body, function (xhttp) {
                    console.log(xhttp.responseText);
                    var res = JSON.parse(xhttp.responseText);
                    my.measureList.removeAll();
                    my.filteredListObservable.removeAll();
                    res.forEach(function (x) {
                        var mes = new monitor.Measure(x);
                        my.measureList.push(mes);
                        my.filteredListObservable.push(mes);
                    });
                    my.stationList().forEach(function (x) {
                        if (x.StationID == my.measureList()[0].station.StationID)
                            my.currentStation(x);
                    });
                    my.currentMeasure(null);
                    my.setCenter()();
                    my.updateSensorList();
                    my.updateDataTypeList();
                });
            }; };
            this.stationList.subscribe(function (x) {
                if (x[x.length - 1] != null) {
                    var marker = new google.maps.Marker();
                    var station = x[x.length - 1];
                    marker.setMap(_this.map);
                    marker.setPosition({
                        lat: x[x.length - 1].StationPositionLat,
                        lng: x[x.length - 1].StationPositionLon
                    });
                    marker.setIcon('img/logo/esn-Marker.png');
                    marker.setTitle(x[x.length - 1].StationName);
                    marker.addListener('click', function () {
                        my.currentStation(station);
                        my.getStationMeasure(my.URL().httpPostLastStationMeasure, station.StationID, function (res) {
                            my.measureList.removeAll();
                            my.filteredListObservable.removeAll();
                            res.forEach(function (x) {
                                var mes = new monitor.Measure(x);
                                my.stationList().forEach(function (y) {
                                    if (y.StationID == x.StationID) {
                                        mes.update(y);
                                    }
                                });
                                my.measureList.push(mes);
                                my.filteredListObservable.push(mes);
                            });
                            my.updateSensorList();
                            my.updateDataTypeList();
                        })();
                        my.setCenter()();
                    });
                }
            }, null, "");
        }
        return MapViewModel;
    })(monitor.SharedViewModel);
    monitor.MapViewModel = MapViewModel;
})(monitor || (monitor = {}));
//# sourceMappingURL=MapViewModel.js.map