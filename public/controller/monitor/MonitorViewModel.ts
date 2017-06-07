/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Sorter.ts" />
/// <reference path="../shared/IStation.ts" />
/// <reference path="../shared/IAggregationList.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/CallURL.ts" />
/// <reference path="../shared/SharedViewModel.ts" />
/// <reference path="../../js/jquery/jquery.d.ts" />
/// <reference path="../../js/knockout/knockout.d.ts" />" />
namespace  monitor {
    export class MonitorViewModel extends SharedViewModel{

        //Sorter
        sorter:Sorter;
        sortByStationName:()=>()=>void
        sortBySensorName:()=>()=>void
        sortBySensorType:()=>()=>void
        sortBySensorValue:()=>()=>void
        sortByDateMeasure:()=>()=>void

        getStationMeasureTable:(id:string)=>()=>void
        getAllMeasure:(url:string)=>()=>void
        constructor() {
            super();
            var my = this;

            my.sorter = new Sorter();

            my.sortByStationName = ()=>()=> {
                my.sorter.sortListByStationName(my.filteredListObservable, true);
            }

            my.sortBySensorName = ()=>()=> {
                my.sorter.sortListBySensorName(my.filteredListObservable, true);
            }

            my.sortBySensorType = ()=>()=> {
                my.sorter.sortListBySensorType(my.filteredListObservable, true);
            }

            my.sortBySensorValue = ()=>()=> {
                my.sorter.sortListBySensorValue(my.filteredListObservable, true);
            }

            my.sortByDateMeasure = ()=>()=> {
                my.sorter.sortListByMeasureTime(my.filteredListObservable, true);
            }


            my.getStationMeasureTable = (id:string)=>()=>{
                my.getStationMeasure(my.URL().httpPostStationMeasure,id,(res:Array<IMeasure>)=>{
                    my.measureList.removeAll();
                    my.filteredListObservable.removeAll();
                    res.forEach((x:IMeasure)=> {
                        var mes = new Measure(x);
                        my.stationList().forEach((y:Station)=> {
                            if (y.StationID == x.StationID) {
                                mes.update(y);
                            }
                        });
                        my.measureList.push(mes);
                        my.filteredListObservable.push(mes);
                    });
                    my.updateSensorList();
                    my.updateDataTypeList();
                    my.addExportButton();
                })();
            }

            my.getAllMeasure = (url:string)=>()=> {
                my.currentSensor = ko.observable(null);
                this.getAllAsync(my.URL().httpServerURL + url, (xhttp:XMLHttpRequest)=> {
                        console.log(xhttp.responseText);
                        var res:Array<IMeasure> = JSON.parse(xhttp.responseText);
                        my.measureList.removeAll();
                        my.filteredListObservable.removeAll();
                        res.forEach((x:IMeasure)=> {
                            my.stationList().forEach((y:Station)=> {
                                if (y.StationID == x.StationID) {
                                    var mes = new Measure(x);
                                    mes.update(y);
                                    my.measureList.push(mes);
                                    my.filteredListObservable.push(mes);
                                }
                            })

                        })
                        my.updateSensorList();
                        my.updateDataTypeList()
                        my.addExportButton();
                    }
                )
            }
        }

        private addExportButton() {
            var table = $("table");
            table.tableExport({
                formats: ["xls", "csv", "txt"],     // (String[]), filetype(s) for the export
                fileName: "id",                     // (id, String), filename for the downloaded file
                bootstrap: false,                    // (Boolean), style buttons using bootstrap
                position: "bottom",                 // (top, bottom), position of the caption element relative to table
            });
        }
    }
}
