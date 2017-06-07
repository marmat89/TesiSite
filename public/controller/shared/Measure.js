/**
 * Created by MarMat89-PC on 14/04/2016.
 */
/// <reference path="IMeasure.ts" />
/// <reference path="Sensor.ts" />
/// <reference path="Station.ts" />
/// <reference path="../../js/moment/moment.d.ts" />
var monitor;
(function (monitor) {
    var Measure = (function () {
        function Measure(measureInterface) {
            this.measureTime = moment(measureInterface.MeasureTime);
            this.sensor = new monitor.Sensor(measureInterface.SensorName, measureInterface.SensorUOM, measureInterface.SensorDataType);
            this.sensorValue = measureInterface.SensorValue;
            this.station = new monitor.Station(measureInterface.StationID, measureInterface.StationName, measureInterface.StationPositionLat, measureInterface.StationPositionLon);
        }
        Measure.prototype.update = function (station) {
            this.station = station;
        };
        return Measure;
    })();
    monitor.Measure = Measure;
})(monitor || (monitor = {}));
//# sourceMappingURL=Measure.js.map