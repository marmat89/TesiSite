/**
 * Created by MarMat89-PC on 14/04/2016.
 */

/// <reference path="IMeasure.ts" />
/// <reference path="Sensor.ts" />
/// <reference path="Station.ts" />
/// <reference path="../../js/moment/moment.d.ts" />
namespace  monitor {
    import Moment = moment.Moment;
    export class Measure {
        sensor:Sensor;
        station:Station;
        sensorValue:Number;
        measureTime:Moment;

        constructor(measureInterface:IMeasure) {
            this.measureTime = moment(measureInterface.MeasureTime);
            this.sensor = new Sensor(measureInterface.SensorName, measureInterface.SensorUOM, measureInterface.SensorDataType);
            this.sensorValue = measureInterface.SensorValue;
            this.station = new Station(measureInterface.StationID, measureInterface.StationName, measureInterface.StationPositionLat, measureInterface.StationPositionLon);
        }

        public update(station:Station) {
            this.station = station;
        }
    }
}