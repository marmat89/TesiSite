/**
 * Created by MarMat89-PC on 14/04/2016.
 */

/// <reference path="GUID.ts" />
namespace  monitor{
export class Sensor {
    SensorID: GUID;
    SensorName:string;
    DataType:string;
    SensorUOM:string;
    constructor(SensorName:string, SensorUOM:string, DataType:string){
        var my = this;
        my.SensorName=SensorName;
        my.SensorUOM=SensorUOM;
        my.DataType=DataType;
        my.SensorID= GUID.newGuid()
    }
}}