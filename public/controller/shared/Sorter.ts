/**
 * Created by MarMat89 on 09/05/16.
 */

/// <reference path="../../js/jquery/jquery.d.ts" />
/// <reference path="../../js/knockout/knockout.d.ts" />" />

/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Measure.ts" />
namespace  monitor{
    export class Sorter {
        StationNameOrder: boolean;
        SensorNameOrder: boolean;
        SensorTypeOrder: boolean;
        SensorValueOrder: boolean;
        MeasureTimeOrder: boolean;
        constructor(){
            var my=this;
            my.StationNameOrder=true;
            my.SensorNameOrder=true;
            my.SensorTypeOrder=true;
            my.SensorValueOrder=true;
            my.MeasureTimeOrder=true;
        }
        public sortListByStationName(list: KnockoutObservableArray<Measure>){
            if (this.StationNameOrder)
            {
            list.sort( (left, right)=> { return left.station.StationName == right.station.StationName ? 0 : (left.station.StationName < right.station.StationName ? -1 : 1) })
            }
               else{
            list.sort( (left, right)=> { return left.station.StationName == right.station.StationName ? 0 : (left.station.StationName > right.station.StationName ? -1 : 1) })
            }
            this.StationNameOrder=!this.StationNameOrder;
        }
        public sortListBySensorName(list: KnockoutObservableArray<Measure>){
            if (this.SensorNameOrder)
            {
                list.sort( (left, right)=> { return left.sensor.SensorName == right.sensor.SensorName ? 0 : (left.sensor.SensorName < right.sensor.SensorName ? -1 : 1) })
            }
            else{
                list.sort( (left, right)=> { return left.sensor.SensorName == right.sensor.SensorName ? 0 : (left.sensor.SensorName > right.sensor.SensorName ? -1 : 1) })
            }

                this.SensorNameOrder=!this.SensorNameOrder
        }
        public sortListBySensorType(list: KnockoutObservableArray<Measure>){
            if (this.SensorTypeOrder)
            {
            list.sort( (left, right)=> { return left.sensor.DataType == right.sensor.DataType ? 0 : (left.sensor.DataType < right.sensor.DataType ? -1 : 1) })
        }
        else{
            list.sort( (left, right)=> { return left.sensor.DataType == right.sensor.DataType ? 0 : (left.sensor.DataType > right.sensor.DataType ? -1 : 1) })
        }
           this.SensorTypeOrder= this.SensorTypeOrder=!this.SensorTypeOrder;
        }

        public sortListBySensorValue(list: KnockoutObservableArray<Measure>){
        if (this.SensorValueOrder)
        {
            list.sort( (left, right)=> { return left.sensorValue == right.sensorValue ? 0 : (left.sensorValue < right.sensorValue ? -1 : 1) })
        }
        else{
            list.sort( (left, right)=> { return left.sensorValue == right.sensorValue ? 0 : (left.sensorValue > right.sensorValue ? -1 : 1) })
        }
           this.SensorValueOrder= !this.SensorValueOrder;
        }
        public sortListByMeasureTime(list: KnockoutObservableArray<Measure>){
        if (this.MeasureTimeOrder)
        {
            list.sort( (left, right)=> { return left.measureTime == right.measureTime ? 0 : (left.measureTime < right.measureTime ? -1 : 1) })
        }
        else{
            list.sort( (left, right)=> { return left.measureTime == right.measureTime ? 0 : (left.measureTime > right.measureTime ? -1 : 1) })
        }
           this.MeasureTimeOrder= !this.MeasureTimeOrder
    }
    }
}