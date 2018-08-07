// http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data/12785546#12785546
// https://code.google.com/p/csv-to-array/

signalwerk = (function(_s) {

// @include "./lib/csvToArray.v2.1.js"

    var csv = {};

    csv.parse = function(strData, strSeparator, strQuote, strNewline) {

        // Excel defaults
        var separator = strSeparator || ';'; // sets a custom field separator character
        var quote = strQuote || ""; // sets a custom value delimiter character
        var newline = strNewline || '\n';
        return csvToArray({
            fSep: separator,
            quot: quote,
            rSep: newline
        }, strData);
    };

    csv.read = function(filepath, strSeparator, strQuote, strNewline) {

        var source = signalwerk.file.read(filepath);
        return this.parse(filepath, strSeparator, strQuote, strNewline);
    };

    _s.csv = csv;
    return _s;

}(this.signalwerk || {}));