
signalwerk = (function(_s) {


    // handlebars loader
    var Handlebars = /*include*/require('./lib/handlebars-v3.0.3.js');

    var idtt = {};

    var fixtures = {
        // "\uFEFF
        // 'BOM UTF-16 LE' : '\xff\xee',
        'RETURN': '\u000D\u000A', // return window style (because of window header)
        'SOFTRETURN': '\u000A',
        'TAB': '\u0009', //Tab-Char 
        'NEXTFRAME': '<cNextXChars:Box>' + '\u000D\u000A', //jump to nextframe
        'SPACE': '\u0020',
        'RIGHTINDENTTAB': '\u0008',
        'NONBREAKINGSPACE': '\u00A0',
        'NONBREAKINGSMALSPACE': '\u2009',
        'NONBREAKINGHYPEN': '\u2011',
        'DiscretionaryHyphen': '\u00AD', // Bedingter Trennstrich
        'HeadWinCS3': '<UNICODE-WIN>' + '\u000D\u000A' + '<Version:5><FeatureSet:InDesign-Roman>' // WIN CS3 Head
    };

    var badChars = /[<>\\]/g,
        possible = /[<>\\]/;
    var escape = {
        '<': '\\<',
        '>': '\\>;',
        '\\': '\\\\'
    };

    function escapeChar(chr) {
        return escape[chr];
    }


    Handlebars.Utils.escapeExpression = function(string) {
        if (typeof string !== 'string') {
            // don't escape SafeStrings, since they're already safe
            if (string && string.toHTML) {
                return string.toHTML();
            } else if (string === null) {
                return '';
            } else if (!string) {
                return string + '';
            }

            // Force a string conversion as this will be done by the append regardless and
            // the regex test will do this transparently behind the scenes, causing issues if
            // an object's to string has escaped characters in it.
            string = '' + string;
        }

        if (!possible.test(string)) {
            return string;
        }
        return string.replace(badChars, escapeChar);
    };


    Handlebars.registerHelper('ParagraphStyle', function(name, options) {


        var nameFinal = name || "NormalParagraphStyle";
        var txt = options.fn(this);

        return new Handlebars.SafeString('<ParaStyle:' + nameFinal + '>' + txt); //+ '<ParaStyle:>'
    });





    Handlebars.registerHelper('TableStyle', function(name, options) {


        var nameFinal = name || "NormalTableStyle";
        var txt = options.fn(this);

        return new Handlebars.SafeString('<TableStyle:' + nameFinal + '>' + txt); //+ '<ParaStyle:>'
    });



    Handlebars.registerHelper('Table', function(rows, columns, options) {

        // <TableStart:2,2:0:0> ==> rows, columns, header rows, footer rows

        var fRows = rows || 1;
        var fColumns = columns || 1;

        var txt = options.fn(this);

        return new Handlebars.SafeString('<TableStart:' + fRows + ',' + fColumns + ':0:0>' + txt + '<TableEnd:>'); //+ '<ParaStyle:>'
    });





    Handlebars.registerHelper('Row', function(options) {

        var txt = options.fn(this);
        return new Handlebars.SafeString('<RowStart:>' + txt + '<RowEnd:>'); //+ '<ParaStyle:>'
    });


    Handlebars.registerHelper('Cell', function() {

        var fColSpan = 1;
        var fRowSpan = 1;

        // {{#Cell 2}} ==> a cell that crosses two columns
        if (arguments.length >= 2) {
            fColSpan = arguments[0];
        }

        // {{#Cell 1 2}} ==> a cell that crosses one column and two rows
        if (arguments.length >= 3) {
            fRowSpan = arguments[1];
        }

        var txt = arguments[arguments.length-1].fn(this);

        return new Handlebars.SafeString('<CellStart:' + fRowSpan + ',' + fColSpan + '>' + txt + '<CellEnd:>'); //+ '<ParaStyle:>'
    });




    Handlebars.registerHelper('CellStyle', function(name, options) {


        var nameFinal = name || "NormalCellStyle";
        var txt = options.fn(this);

        return new Handlebars.SafeString('<CellStyle:' + nameFinal + '>' + txt); //+ '<ParaStyle:>'
    });





    Handlebars.registerHelper("ColWidth", function(withInMM) {

        // <TableStart:2,2:0:0> ==> rows, columns, header rows, footer rows

        var fWidth = signalwerk.unit.mm2pt( withInMM || 10 );

        return new Handlebars.SafeString('<ColStart:<tColAttrWidth:' + fWidth + '>>');
    });




    // only adds a delimiter if not precended by a separator
    // {{separator delimiter=", "}}
    // {{#separator delimiter=", "}}-{{a}}-{{/separator}}
    // {{#separator delimiter=", "}}-{{b}}-{{/separator}}
    // {{#separator delimiter=", "}}-{{c}}-{{/separator}}

    var delimiterCounter = 0;

    Handlebars.registerHelper('separator', function(block) {
        var delimiter = block.hash.delimiter || ", ";


        var txt = block.fn(this);
        
        if (delimiterCounter === 0) {
            return delimiter + txt;
        } else {
            delimiterCounter = 0;
            return txt;
        }
            
    });

    Handlebars.registerHelper("forceseparator", function(block) {
        var delimiter = block.hash.delimiter || ", ";

        delimiterCounter = 1;
        return delimiter;
    });


    Handlebars.registerHelper('CharStyle', function(name, options) {

        var nameFinal = name || "";
        var txt = options.fn(this);

        return new Handlebars.SafeString('<CharStyle:' + nameFinal + '>' + txt + '<CharStyle:>');
    });


    Handlebars.registerHelper("fixture", function(id) {

        if (fixtures.hasOwnProperty(id)) {
            return new Handlebars.SafeString(fixtures[id]);
        } else {
            return '';
        }
    });


    Handlebars.registerHelper("text", function(txt) {

        return new Handlebars.SafeString(txt);
    });


    idtt.compile = function(source) {
        return Handlebars.compile(source);
    };


    // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
    function toBinaryUTF16LE(str) {

        var out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            var charcode = str.charCodeAt(i);

            out += String.fromCharCode(charcode & 0xff);
            out += String.fromCharCode(((charcode >> 8) & 0xff));
        }
        return out;
    }


    idtt.process = function(filepath, data) {



            var source = signalwerk.file.read(filepath);

            // remove whitespace
            // source = source.replace( new RegExp( "}}[\n\r\t ]+{{" , "g" ) , "}}{{" ); 
            source = source.replace(/\}\}\s+\{\{/g, "}}{{");
            source = source.trim();

            // convert line endingts to window
            source = source.replace(/(\r\n|\n|\r)/gm, '\r\n');

            //console.log("-----source-----");
            //console.log(source);


            // set up your handlebars template
            //var source = '{{#each foo}}<p>{{this.bar}}</p>{{/each}}';

            // compile the template
            //var template = Handlebars.compile(source, {noEscape: true});
            var template = signalwerk.idtt.compile(source);


            // call template as a function, passing in your data as the context
            // var outputString = template({
            //     foo: [{
            //         bar: "&<>\\\"'`"
            //     }, {
            //         bar: "kk2"
            //     }]
            // });


            return template( data );







    };


    idtt.write = function(filepath, str, strEncoding, strLineFeed) {

        var encoding = strEncoding || "BINARY"; // "UTF-16LE" "BINARY"
        var lineFeed = strLineFeed || "Windows"; // "Unix" "Windows" "Macintosh"

        // write with BOM
        return signalwerk.file.write(filepath, '\xff\xfe' + toBinaryUTF16LE(str), encoding, lineFeed);
    };



    _s.idtt = idtt;
    return _s;

}(this.signalwerk || {}));
