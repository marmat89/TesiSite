var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../shared/IMeasure.ts" />
/// <reference path="../shared/Sorter.ts" />
/// <reference path="../shared/IStation.ts" />
/// <reference path="../shared/IAggregationList.ts" />
/// <reference path="../shared/Sensor.ts" />
/// <reference path="../shared/CallURL.ts" />
/// <reference path="../shared/SharedViewModel.ts" />
/// <reference path="../../js/jquery/jquery.d.ts" />
/// <reference path="../../js/knockout/knockout.d.ts" />" />
var monitor;
(function (monitor) {
    var MonitorViewModel = (function (_super) {
        __extends(MonitorViewModel, _super);
        function MonitorViewModel() {
            var _this = this;
            _super.call(this);
            var my = this;
            my.sorter = new monitor.Sorter();
            my.sortByStationName = function () { return function () {
                my.sorter.sortListByStationName(my.filteredListObservable, true);
            }; };
            my.sortBySensorName = function () { return function () {
                my.sorter.sortListBySensorName(my.filteredListObservable, true);
            }; };
            my.sortBySensorType = function () { return function () {
                my.sorter.sortListBySensorType(my.filteredListObservable, true);
            }; };
            my.sortBySensorValue = function () { return function () {
                my.sorter.sortListBySensorValue(my.filteredListObservable, true);
            }; };
            my.sortByDateMeasure = function () { return function () {
                my.sorter.sortListByMeasureTime(my.filteredListObservable, true);
            }; };
            my.getStationMeasureTable = function (id) { return function () {
                my.getStationMeasure(my.URL().httpPostStationMeasure, id, function (res) {
                    my.measureList.removeAll();
                    my.filteredListObservable.removeAll();
                    res.forEach(function (x) {
                        var mes = new monitor.Measure(x);
                        my.stationList().forEach(function (y) {
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
            }; };
            my.getAllMeasure = function (url) { return function () {
                my.currentSensor = ko.observable(null);
                _this.getAllAsync(my.URL().httpServerURL + url, function (xhttp) {
                    console.log(xhttp.responseText);
                    var res = JSON.parse(xhttp.responseText);
                    my.measureList.removeAll();
                    my.filteredListObservable.removeAll();
                    res.forEach(function (x) {
                        my.stationList().forEach(function (y) {
                            if (y.StationID == x.StationID) {
                                var mes = new monitor.Measure(x);
                                mes.update(y);
                                my.measureList.push(mes);
                                my.filteredListObservable.push(mes);
                            }
                        });
                    });
                    my.updateSensorList();
                    my.updateDataTypeList();
                    my.addExportButton();
                });
            }; };
        }
        MonitorViewModel.prototype.addExportButton = function () {
            var table = $("table");
            table.tableExport({
                formats: ["xls", "csv", "txt"],
                fileName: "id",
                bootstrap: false,
                position: "bottom"
            });
        };
        return MonitorViewModel;
    })(monitor.SharedViewModel);
    monitor.MonitorViewModel = MonitorViewModel;
})(monitor || (monitor = {}));
//# sourceMappingURL=MonitorViewModel.js.map