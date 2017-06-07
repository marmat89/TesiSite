/**
 * Created by MarMat89-PC on 14/04/2016.
 */
namespace  monitor{
export interface IMeasure {
    StationID: string;
    StationName:string;
    StationPositionLat: number;
    StationPositionLon: number;
    SensorName:string;
    SensorDataType:string;
    SensorValue:any;
    SensorUOM:string;
    MeasureTime: Date;
}}