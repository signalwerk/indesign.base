signalwerk = (function(_s) {

    var _time = {};

    // Unix timestamp
    _time.timestamp = function(tDate) {
        var cDate = tDate || new Date();
        return Math.floor(cDate.getTime() / 1000);
    };

    _s.time = _time;
    return _s;

}(this.signalwerk || {}));