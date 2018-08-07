﻿// https://github.com/fabiantheblind/extendscript
//[at]target indesign;
// #  ..     targetengine "session";



// fakes commonjs require 
// @include "./require.js"

// Polyfill ECMAScript 6
// @include "./ES6.js"


// http://underscorejs.org/
// @include "./lib/underscore/underscore.js"

// class methond
// @include "./lib/_class.js"



// oauth lib
// https://raw.githubusercontent.com/moodev/moo-indesign/master/moo.jsx



var signalwerk = {};
signalwerk.info = {
    version : "0.1.0"
};

// @include "./file.js"
// @include "./IDTT.js"
// @include "./csv.js"
// @include "./unit.js"
// @include "./prefs.js"
// @include "./textFrames.js"
// @include "./pdf.js"
// @include "./time.js"
// @include "./version.js"
// @include "./build.js"



signalwerk.doc = klass({

    _doc: false,

    initialize : function() {

        // var myDoc = (app.documents.length && app.activeDocument) || doc;

        if (app.documents.length && app.activeDocument instanceof Document) {
            this._doc = app.activeDocument;
        }

        this.prefs = new signalwerk._prefs(this);
        this.pdf = new signalwerk._pdf(this);
        this.textFrames = new signalwerk._textFrames(this);

    },


    open: function(inFile, showWindow) {

        var finalFile = inFile;
        var showWindow = showWindow || true;

        if (inFile.constructor.name == "String") {
            finalFile = File(inFile);
        }

        this._doc = app.open(finalFile, showWindow, OpenOptions.OPEN_ORIGINAL);     
    },


    close: function(saveFirst) {

        if (saveFirst) {
            this._doc.close ( SaveOptions.YES );
        } else {
            this._doc.close ( SaveOptions.NO );
        }        
    },

    save: function(savePath) {

        if (savePath) {
            this._doc.save(savePath);
        } else {
            this._doc.save();
        }     
    },

    path: function(saveFirst) {

        return this._doc.filePath.fsName;
    },



    doc : function() { return this._doc; }
});

