/**
 * Created by MarMat89-PC on 21/04/2016.
 */

/// <reference path="../../js/knockout/knockout.d.ts" />" />
/// <reference path="StationMeasure.ts" />
namespace  monitor{
    export class Station {
        StationID: string;
        StationName:string;
        StationPositionLat: number;
        StationPositionLon: number;
        MeasureNumber: number;
        StationDescription : string;
        StationDebugger : boolean;
        StationDebuggerType : Array<string>;
        StationImage : string;
        LastMeasure : KnockoutObservableArray<StationMeasure>;
        constructor(ID:string, StationName:string, lat:number,lon:number,mesNum?:number){
            var my = this;
            my.LastMeasure = ko.observableArray([]);
            my.StationID= ID;
            my.StationName=StationName;
            my.StationPositionLat=lat;
            my.StationPositionLon=lon;
            my.MeasureNumber=mesNum;
            my.StationDebugger=false;
            my.StationDescription="NO DESCRIPTION available for this station";
        }
        public update(desc:string,deb:boolean,debType:Array<string>,img:string){
            this.StationDescription=desc;
            this.StationDebugger=deb;
            this.StationDebuggerType=debType;
            this.StationImage=img;
        }
        public pushMeasure(measure:IMeasure){
            this.LastMeasure.push(new StationMeasure(measure));
        };
        public clearMeasure(){
            this.LastMeasure.removeAll();
        };
    }}