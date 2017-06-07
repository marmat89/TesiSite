/**
 * Created by MarMat89-PC on 21/04/2016.
 */
var monitor;
(function (monitor) {
    var GUID = (function () {
        function GUID() {
        }
        GUID.newGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        return GUID;
    })();
    monitor.GUID = GUID;
})(monitor || (monitor = {}));
//# sourceMappingURL=GUID.js.map