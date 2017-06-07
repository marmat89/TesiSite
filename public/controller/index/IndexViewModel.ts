/**
 * Created by MarMat89 on 23/05/2016.
 */
/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Measure.ts" />
/// <reference path="../shared/ChartData.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/SharedViewModel.ts" />
/// <reference path="../../js/chartjs/chart.d.ts" />
namespace  monitor {

    export class IndexViewModel extends SharedViewModel {

        constructor() {
            super();
            var my = this;
            my.stationList.extend({rateLimit: 500});
            this.stationList.subscribe((x:Array<Station>)=> {
                if (x[x.length - 1] != null) {
                    x.forEach((y:Station)=>{
                        my.getStationMeasure(my.URL().httpPostLastStationMeasure, y.StationID,(res:Array<IMeasure>)=>{
                            res.forEach((z:IMeasure)=> {
                                y.pushMeasure(z)
                            })
                        })();
                    })
                }
            }, null, "")
        }
    }
}
