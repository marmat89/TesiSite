/**
 * Created by MarMat89-PC on 14/04/2016.
 */
/// <reference path="IMeasure.ts" />
/// <reference path="Sensor.ts" />
/// <reference path="../../js/moment/moment.d.ts" />
var monitor;
(function (monitor) {
    var StationMeasure = (function () {
        function StationMeasure(measureInterface) {
            this.measureTime = moment(measureInterface.MeasureTime);
            this.sensor = new monitor.Sensor(measureInterface.SensorName, measureInterface.SensorUOM, measureInterface.SensorDataType);
            this.sensorValue = measureInterface.SensorValue;
        }
        return StationMeasure;
    })();
    monitor.StationMeasure = StationMeasure;
})(monitor || (monitor = {}));
//# sourceMappingURL=StationMeasure.js.map