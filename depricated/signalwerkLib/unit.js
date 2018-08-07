﻿
signalwerk = (function(_s) {

    var unit = {};


    unit.mm2pt = function(mm) {
        return mm*72/25.4;
    };
    
    unit.pt2mm = function(mm) {
        return mm*25.4/72;
    };

    _s.unit = unit;
    return _s;

}(this.signalwerk || {}));
