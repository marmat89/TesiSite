/**
 * Created by MarMat89-PC on 21/04/2016.
 */
/// <reference path="../../js/knockout/knockout.d.ts" />" />
/// <reference path="StationMeasure.ts" />
var monitor;
(function (monitor) {
    var Station = (function () {
        function Station(ID, StationName, lat, lon, mesNum) {
            var my = this;
            my.LastMeasure = ko.observableArray([]);
            my.StationID = ID;
            my.StationName = StationName;
            my.StationPositionLat = lat;
            my.StationPositionLon = lon;
            my.MeasureNumber = mesNum;
            my.StationDebugger = false;
            my.StationDescription = "NO DESCRIPTION available for this station";
        }
        Station.prototype.update = function (desc, deb, debType, img) {
            this.StationDescription = desc;
            this.StationDebugger = deb;
            this.StationDebuggerType = debType;
            this.StationImage = img;
        };
        Station.prototype.pushMeasure = function (measure) {
            this.LastMeasure.push(new monitor.StationMeasure(measure));
        };
        ;
        Station.prototype.clearMeasure = function () {
            this.LastMeasure.removeAll();
        };
        ;
        return Station;
    })();
    monitor.Station = Station;
})(monitor || (monitor = {}));
//# sourceMappingURL=Station.js.map