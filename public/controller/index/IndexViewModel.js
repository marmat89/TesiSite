var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by MarMat89 on 23/05/2016.
 */
/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Measure.ts" />
/// <reference path="../shared/ChartData.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/SharedViewModel.ts" />
/// <reference path="../../js/chartjs/chart.d.ts" />
var monitor;
(function (monitor) {
    var IndexViewModel = (function (_super) {
        __extends(IndexViewModel, _super);
        function IndexViewModel() {
            _super.call(this);
            var my = this;
            my.stationList.extend({ rateLimit: 500 });
            this.stationList.subscribe(function (x) {
                if (x[x.length - 1] != null) {
                    x.forEach(function (y) {
                        my.getStationMeasure(my.URL().httpPostLastStationMeasure, y.StationID, function (res) {
                            res.forEach(function (z) {
                                y.pushMeasure(z);
                            });
                        })();
                    });
                }
            }, null, "");
        }
        return IndexViewModel;
    })(monitor.SharedViewModel);
    monitor.IndexViewModel = IndexViewModel;
})(monitor || (monitor = {}));
//# sourceMappingURL=IndexViewModel.js.map