/**
 * Created by MarMat89-PC on 06/05/2016.
 */
var monitor;
(function (monitor) {
    var CallURL = (function () {
        function CallURL() {
            //public httpServerURL:string = "http://127.0.0.1:3100/";//OFFLINE
            this.httpServerURL = "http://esn.cloudno.de/"; //ONLINE
            this.httpPostLastStationMeasure = "stationLastMeasure";
            this.httpPostStationMeasure = "stationMeasure";
            this.httpPostStationInfo = "stationInfo";
        }
        return CallURL;
    })();
    monitor.CallURL = CallURL;
})(monitor || (monitor = {}));
//# sourceMappingURL=CallURL.js.map