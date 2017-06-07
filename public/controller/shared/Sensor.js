/**
 * Created by MarMat89-PC on 14/04/2016.
 */
/// <reference path="GUID.ts" />
var monitor;
(function (monitor) {
    var Sensor = (function () {
        function Sensor(SensorName, SensorUOM, DataType) {
            var my = this;
            my.SensorName = SensorName;
            my.SensorUOM = SensorUOM;
            my.DataType = DataType;
            my.SensorID = monitor.GUID.newGuid();
        }
        return Sensor;
    })();
    monitor.Sensor = Sensor;
})(monitor || (monitor = {}));
//# sourceMappingURL=Sensor.js.map