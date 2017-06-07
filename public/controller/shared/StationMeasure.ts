/**
 * Created by MarMat89-PC on 14/04/2016.
 */

/// <reference path="IMeasure.ts" />
/// <reference path="Sensor.ts" />
/// <reference path="../../js/moment/moment.d.ts" />
namespace  monitor {
    import Moment = moment.Moment;
    export class StationMeasure {
        sensor:Sensor;
        sensorValue:Number;
        measureTime:Moment;
        constructor(measureInterface:IMeasure) {
            this.measureTime = moment(measureInterface.MeasureTime);
            this.sensor = new Sensor(measureInterface.SensorName, measureInterface.SensorUOM, measureInterface.SensorDataType);
            this.sensorValue = measureInterface.SensorValue;
        }
    }
}