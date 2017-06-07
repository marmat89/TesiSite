/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Sorter.ts" />
/// <reference path="../shared/IStation.ts" />
/// <reference path="../shared/IAggregationList.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/CallURL.ts" />
/// <reference path="../../js/jquery/jquery.d.ts" />
/// <reference path="../../js/knockout/knockout.d.ts" />" />
namespace  monitor {
    export class SharedViewModel {


        URL:KnockoutObservable<CallURL>;

        measureList:KnockoutObservableArray<Measure>
        stationList:KnockoutObservableArray<Station>
        sensorList:KnockoutObservableArray<Sensor>

        typeList:KnockoutObservableArray<string>

        getStationMeasure:(url:string, id:string,callback:(res:Array<IMeasure>)=>void)=>()=>void
        getStationInfo:(url:string, id:string)=>void
        filteredListObservable:KnockoutObservableArray<Measure>

        setFilterSensorCondition:(filter:string)=>()=>void
        setFilterTypeCondition:(filter:string)=>()=>void


        currentMeasure:KnockoutObservable<Measure>;
        setCurrentMeasure:(measure:Measure)=>()=>void

        currentStation:KnockoutObservable<Station>;
        setCurrentStation:(station:Station)=>()=>void


        currentSensor:KnockoutObservable<Sensor>;

        constructor() {
            var my = this;
            my.URL = ko.observable(new CallURL());
            my.measureList = ko.observableArray([]);
            my.sensorList = ko.observableArray([]);
            my.filteredListObservable = ko.observableArray([]);
            my.stationList = ko.observableArray([]);
            my.typeList = ko.observableArray([]);

            my.currentSensor = ko.observable(null);
            my.currentMeasure = ko.observable(null);
            my.setCurrentMeasure = (measure:Measure)=>()=> {
                my.currentMeasure(measure);
            }
            my.currentStation = ko.observable(null);
            my.setCurrentStation = (station:Station)=>()=> {
                my.stationList().forEach((x:Station)=>{
                    if(x.StationID==station.StationID)
                        my.currentStation(x);
                })
            }

            my.setFilterSensorCondition = (filter:string)=>()=> {
                my.filteredListObservable.removeAll();
                my.currentSensor = ko.observable(null);
                if (filter == "") my.measureList().forEach((x:Measure)=> {
                    my.filteredListObservable.push(x)
                });
                else
                    my.measureList().forEach((x:Measure)=> {
                        if (x.sensor.SensorName == filter) {
                            my.currentSensor(x.sensor);
                            my.filteredListObservable.push(x)
                        }
                    })
            }
            my.setFilterTypeCondition = (filter:string)=>()=> {
                my.filteredListObservable.removeAll();
                my.currentSensor = ko.observable(null);
                if (filter == "") my.measureList().forEach((x:Measure)=> {
                    my.filteredListObservable.push(x)
                });
                else
                    my.measureList().forEach((x:Measure)=> {
                        if (x.sensor.DataType == filter)
                            my.filteredListObservable.push(x)
                    })
            }

            my.getStationInfo = (url:string, id:string)=> {
                var body = JSON.stringify({"id": id});
                my.currentSensor = ko.observable(null);
                my.currentMeasure(null);
                my.getSationAsync(my.URL().httpServerURL + url, body, (xhttp:XMLHttpRequest)=> {
                        console.log(xhttp.responseText);
                        var res:Array<IStation> = JSON.parse(xhttp.responseText);
                        res.forEach((x:IStation)=> {
                            my.stationList().forEach((y:Station)=> {
                                if (y.StationID == x._id)
                                    y.update(x.StationDescription, x.StationDebugger, x.StationDebuggerType, x.StationImage);
                            })
                        })
                    }
                )
            }
            my.getStationMeasure = (url:string, id:string, callback:(res:Array<IMeasure>)=>void)=>()=> {
                var body = JSON.stringify({"id": id});
                my.currentSensor = ko.observable(null);
                my.currentMeasure(null);
                my.getSationAsync(my.URL().httpServerURL + url, body, (xhttp:XMLHttpRequest)=> {
                        console.log(xhttp.responseText);
                        var res:Array<IMeasure> = JSON.parse(xhttp.responseText);
                        callback(res);
                    }
                )
            }




            //carica dati stazioni
            this.getAllAsync(my.URL().httpServerURL + "GetStationList", (xhttp:XMLHttpRequest)=> {
                    console.log(xhttp.responseText);
                    var res:Array<IAggregationList> = JSON.parse(xhttp.responseText);
                    my.stationList.removeAll();
                    var i:number = 0
                    res.forEach((x:IAggregationList)=> {
                        my.stationList.push(new Station(x._id, x.name, x.lat, x.lon, x.measureNumber));
                        my.getStationInfo(my.URL().httpPostStationInfo, x._id);
                        i++;
                    })
                    my.updateSensorList();
                    my.updateDataTypeList()
                }
            )

        }


        public updateSensorList() {
            var my = this;
            my.sensorList.removeAll();
            my.measureList().forEach((x:Measure)=> {
                var find = false;
                my.sensorList().forEach((y:Sensor)=> {
                    if (x.sensor.SensorName == y.SensorName) {
                        find = true;
                    }
                });
                if (!find) {
                    my.sensorList.push({
                        SensorID: 1,
                        SensorName: x.sensor.SensorName,
                        SensorUOM: ""
                    });
                }
            })
        }

        public updateDataTypeList() {
            var my = this;
            my.typeList.removeAll();
            my.measureList().forEach((x:Measure)=> {
                var find = false;
                my.typeList().forEach((y:string)=> {
                    if (x.sensor.DataType == y) {
                        find = true;
                    }
                });
                if (!find) {
                    my.typeList.push(x.sensor.DataType);
                }
            })
        }

        public  getAllAsync(url:string, callback:(xhttp:XMLHttpRequest)=>void) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    callback(xhttp);
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();

        }

        public getSationAsync(url:string, data:string, callback:(xhttp:XMLHttpRequest)=>void) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    callback(xhr);
                }
            }
            xhr.send(data);
        }
    }
}
