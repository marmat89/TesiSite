/**
 * Created by MarMat89-PC on 14/04/2016.
 */

/// <reference path="../../js/googlemaps/google.maps.d.ts" />
/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Measure.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/SharedViewModel.ts" />
namespace  monitor {

    export class MapViewModel extends SharedViewModel {

        options:any
        map:google.maps.Map
        setCenter:()=>()=>void
        getStationLastMeasure:(url:string, id:string)=>()=>void

        constructor(mapDiv:Element) {
            super();
            var my = this;

            //navigator.geolocation.getCurrentPosition((position:any)=> {
            //    this.options = {
            //        zoom: 16,
            //        center: {lat: position.coords.latitude, lng: position.coords.longitude}
            //    };
            //    this.map = new google.maps.Map(mapDiv, this.options);
            //    this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN)
            //});

            this.options = {
                zoom: 16,
                center: {lat: 44.1404, lng: 12.24431}
            };
            this.map = new google.maps.Map(mapDiv, this.options);
            this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN)

            this.setCenter = ()=>()=> {
                my.map.setCenter({
                    lat: my.currentStation().StationPositionLat,
                    lng: my.currentStation().StationPositionLon
                })

            };
            my.getStationLastMeasure = (url:string, id:string)=>()=> {
                var body = JSON.stringify({"id": id});
                my.getSationAsync(my.URL().httpServerURL + url, body, (xhttp:XMLHttpRequest)=> {
                        console.log(xhttp.responseText);
                        var res:Array<IMeasure> = JSON.parse(xhttp.responseText);
                        my.measureList.removeAll();
                        my.filteredListObservable.removeAll();
                        res.forEach((x:IMeasure)=> {
                            var mes = new Measure(x);
                            my.measureList.push(mes);
                            my.filteredListObservable.push(mes);
                        })
                    my.stationList().forEach((x:Station)=>{
                        if(x.StationID==my.measureList()[0].station.StationID)
                            my.currentStation(x);
                    })
                        my.currentMeasure(null);
                        my.setCenter()();
                        my.updateSensorList();
                        my.updateDataTypeList()
                    }
                )
            }
            this.stationList.subscribe((x:Array<Station>)=> {
                if (x[x.length - 1] != null) {
                    var marker = new google.maps.Marker();
                    var station = x[x.length - 1];
                    marker.setMap(this.map);
                    marker.setPosition({
                        lat: x[x.length - 1].StationPositionLat,
                        lng: x[x.length - 1].StationPositionLon
                    });
                    marker.setIcon('img/logo/esn-Marker.png');
                    marker.setTitle(x[x.length - 1].StationName);
                    marker.addListener('click', ()=> {
                        my.currentStation(station);
                        my.getStationMeasure(my.URL().httpPostLastStationMeasure, station.StationID,(res:Array<IMeasure>)=>{
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

                            })
                            my.updateSensorList();
                            my.updateDataTypeList();
                        })();
                        my.setCenter()();
                    });
                }
            }, null, "")
        }
    }
}
