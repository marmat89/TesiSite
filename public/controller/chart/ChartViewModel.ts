/**
 * Created by MarMat89-PC on 14/04/2016.
 */
/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Measure.ts" />
/// <reference path="../shared/ChartData.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/SharedViewModel.ts" />
/// <reference path="../../js/chartjs/chart.d.ts" />
namespace  monitor {

    export class ChartViewModel extends SharedViewModel {


        getStationMeasureChart:(id:string)=>()=>void
        setChartType:(typec:String)=>()=>void
        constructor() {
            super();
            var my = this;
            var styles = ["rgba(34, 255, 30,1)", "rgba(123,234,212,1)", "rgba(255, 30, 34,1)", "rgba(30, 34, 255,1)", "rgba(255, 251, 30,1)", "rgba(251, 30, 255,1)", "rgba(139, 30, 255,1)", "rgba(255, 139, 30,1)", "rgba(30, 255, 139,1)"]

            my.getStationMeasureChart = (id:string)=>()=>{
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

                    })
                    my.updateSensorList();
                    my.updateDataTypeList();
                })();
            }


            my.filteredListObservable.extend({rateLimit: 500});
            var ctx = document.getElementById("esnChart");


            var startingData = {
                labels: [],
                datasets: []
            }
            var myChart = new Chart(ctx, {
                type: "line",
                data: startingData,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            my.setChartType = (typec:String)=>()=> {
                var startingData = {
                    labels: [],
                    datasets: []
                }
                myChart.destroy();
                var ctx = document.getElementById("esnChart").getContext("2d");
                myChart=new Chart(ctx, {
                    type: typec,
                    data: startingData,
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                myChart.data.datasets = [];
                myChart.data.labels = [];
                var i = 0;
                if (my.currentSensor()){
                    myChart.data.datasets.push(
                        {
                            label: my.currentSensor().SensorName,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: styles[i],
                            borderColor: styles[i],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: styles[i],
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "#267F00",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [],
                        });
                }
                else {
                    this.sensorList().forEach((x:Sensor)=> {
                        myChart.data.datasets.push(
                            {
                                label: x.SensorName,
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: styles[i],
                                borderColor: styles[i],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: styles[i],
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "#267F00",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: [],
                            });
                        i++;
                    })
                }
                myChart.update();
                    my.filteredListObservable().forEach((x:Measure)=> {
                        myChart.data.datasets.forEach((y:any)=> {
                            if (y.label == x.sensor.SensorName) {
                                y.data.push(x.sensorValue);
                                x.measureTime.get('year');
                                myChart.data.labels.push("" + x.measureTime.get('hour') + ":" + x.measureTime.get('minute') + "");
                            }
                        })
                    })
                    var labN = 0;
                    if (!my.currentSensor || myChart.data.datasets.length != 1) {

                        myChart.data.labels = [];
                        myChart.data.datasets.forEach((x:any)=> {
                            if (x.data.length > labN) {
                                labN = x.data.length;
                            }
                        });
                        var i:number = 0;
                        while (labN > 0) {
                            labN--;
                            myChart.data.labels.push("");
                            i++;
                        }
                    }
                myChart.update();
            }
            my.filteredListObservable.subscribe((newMes:Array<Measure>)=> {
                    myChart.data.datasets = [];
                    myChart.data.labels = [];
                    var i = 0;
                    if (my.currentSensor()){
                            myChart.data.datasets.push(
                                {
                                    label: my.currentSensor().SensorName,
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: styles[i],
                                    borderColor: styles[i],
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: styles[i],
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "#267F00",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: [],
                                });
                    }
                    else {
                        this.sensorList().forEach((x:Sensor)=> {
                            myChart.data.datasets.push(
                                {
                                    label: x.SensorName,
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: styles[i],
                                    borderColor: styles[i],
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: styles[i],
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "#267F00",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: [],
                                });
                            i++;
                        })
                    }
                    myChart.update();
                    if (newMes) {
                        newMes.forEach((x:Measure)=> {
                            myChart.data.datasets.forEach((y:any)=> {
                                if (y.label == x.sensor.SensorName) {
                                    y.data.push(x.sensorValue);
                                    x.measureTime.get('year');
                                    myChart.data.labels.push("" + x.measureTime.get('hour') + ":" + x.measureTime.get('minute') + "");
                                }
                            })
                        })
                        var labN = 0;
                        if (!my.currentSensor || myChart.data.datasets.length != 1) {

                            myChart.data.labels = [];
                            myChart.data.datasets.forEach((x:any)=> {
                                if (x.data.length > labN) {
                                    labN = x.data.length;
                                }
                            });
                            var i:number = 0;
                            while (labN > 0) {
                                labN--;
                                myChart.data.labels.push("");
                                i++;
                            }
                        }
                    }
                    myChart.update();
                }

                ,
                my
                ,
                "change"
            );
        }
    }
}
