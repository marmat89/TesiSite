/**
 * Created by MarMat89 on 09/05/16.
 */
/// <reference path="../../js/jquery/jquery.d.ts" />
/// <reference path="../../js/knockout/knockout.d.ts" />" />
/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Measure.ts" />
var monitor;
(function (monitor) {
    var Sorter = (function () {
        function Sorter() {
            var my = this;
            my.StationNameOrder = true;
            my.SensorNameOrder = true;
            my.SensorTypeOrder = true;
            my.SensorValueOrder = true;
            my.MeasureTimeOrder = true;
        }
        Sorter.prototype.sortListByStationName = function (list) {
            if (this.StationNameOrder) {
                list.sort(function (left, right) { return left.station.StationName == right.station.StationName ? 0 : (left.station.StationName < right.station.StationName ? -1 : 1); });
            }
            else {
                list.sort(function (left, right) { return left.station.StationName == right.station.StationName ? 0 : (left.station.StationName > right.station.StationName ? -1 : 1); });
            }
            this.StationNameOrder = !this.StationNameOrder;
        };
        Sorter.prototype.sortListBySensorName = function (list) {
            if (this.SensorNameOrder) {
                list.sort(function (left, right) { return left.sensor.SensorName == right.sensor.SensorName ? 0 : (left.sensor.SensorName < right.sensor.SensorName ? -1 : 1); });
            }
            else {
                list.sort(function (left, right) { return left.sensor.SensorName == right.sensor.SensorName ? 0 : (left.sensor.SensorName > right.sensor.SensorName ? -1 : 1); });
            }
            this.SensorNameOrder = !this.SensorNameOrder;
        };
        Sorter.prototype.sortListBySensorType = function (list) {
            if (this.SensorTypeOrder) {
                list.sort(function (left, right) { return left.sensor.DataType == right.sensor.DataType ? 0 : (left.sensor.DataType < right.sensor.DataType ? -1 : 1); });
            }
            else {
                list.sort(function (left, right) { return left.sensor.DataType == right.sensor.DataType ? 0 : (left.sensor.DataType > right.sensor.DataType ? -1 : 1); });
            }
            this.SensorTypeOrder = this.SensorTypeOrder = !this.SensorTypeOrder;
        };
        Sorter.prototype.sortListBySensorValue = function (list) {
            if (this.SensorValueOrder) {
                list.sort(function (left, right) { return left.sensorValue == right.sensorValue ? 0 : (left.sensorValue < right.sensorValue ? -1 : 1); });
            }
            else {
                list.sort(function (left, right) { return left.sensorValue == right.sensorValue ? 0 : (left.sensorValue > right.sensorValue ? -1 : 1); });
            }
            this.SensorValueOrder = !this.SensorValueOrder;
        };
        Sorter.prototype.sortListByMeasureTime = function (list) {
            if (this.MeasureTimeOrder) {
                list.sort(function (left, right) { return left.measureTime == right.measureTime ? 0 : (left.measureTime < right.measureTime ? -1 : 1); });
            }
            else {
                list.sort(function (left, right) { return left.measureTime == right.measureTime ? 0 : (left.measureTime > right.measureTime ? -1 : 1); });
            }
            this.MeasureTimeOrder = !this.MeasureTimeOrder;
        };
        return Sorter;
    })();
    monitor.Sorter = Sorter;
})(monitor || (monitor = {}));
//# sourceMappingURL=Sorter.js.map