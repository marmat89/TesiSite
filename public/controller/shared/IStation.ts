/**
 * Created by MarMat89-PC on 05/05/2016.
 */
namespace  monitor{
    export interface IStation {
        _id:string;
        StationID: string;
        StationName: string;
        lat: number;
        lon: number;
        StationDescription: string;
        StationDebugger: boolean;
        StationDebuggerType: Array<string>;
        StationImage: string;
    }}