/**
 * Created by MarMat89-PC on 06/05/2016.
 */
namespace  monitor {
    export class CallURL {
        //public httpServerURL:string = "http://127.0.0.1:3100/";//OFFLINE
        public httpServerURL:string = "http://esn.cloudno.de/"; //ONLINE
        public httpPostLastStationMeasure:string = "stationLastMeasure";
        public httpPostStationMeasure:string = "stationMeasure";
        public httpPostStationInfo:string = "stationInfo";
    }
}