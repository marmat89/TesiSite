/**
 * Created by MarMat89-PC on 21/04/2016.
 */
/// <reference path="../shared/Measure.ts" />
/// <reference path="../shared/Sensor.ts" />
var monitor;
(function (monitor) {
    var ChartData = (function () {
        function ChartData(label, dataMes) {
            var my = this;
            my.label = label;
            my.fillColor = "rgba(220,220,220,0.2)";
            my.strokeColor = "rgba(220,220,220,1)";
            my.pointColor = "rgba(220,220,220,1)";
            my.pointStrokeColor = "#fff";
            my.pointHighlightFill = "#fff";
            my.pointHighlightStroke = "rgba(220,220,220,1)";
            my.data = dataMes;
        }
        return ChartData;
    })();
    monitor.ChartData = ChartData;
})(monitor || (monitor = {}));
//# sourceMappingURL=ChartData.js.map