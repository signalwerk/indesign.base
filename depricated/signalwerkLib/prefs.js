﻿
// prefs:
// https://indisnip.wordpress.com/2010/07/31/saving-script-data-within-document/
// https://indisnip.wordpress.com/2010/12/31/saving-script-data-using-json-part-2/
// https://indisnip.wordpress.com/2010/09/07/storing-custom-data-into-indesign-file-xmp/

signalwerk = (function(_s) {

    // constructors
    _s._prefs = klass(function(parent) {
        this.parent = parent;

        // where to save the data. In a file or in the doc
        this.externalJson = false;
        this.externalJsonPath =  Folder.temp + "/prefs_doc_" + signalwerk.time.timestamp() + "_prefs.json";

    });



    _s._prefs.methods({


        json: function(val, path) {
            this.externalJson = val;
            if (path) {

                this.externalJsonPath = path;
                var dir = path.substring(0, path.lastIndexOf('/'));
                // create the folder
                signalwerk.file.folder(dir);
            }
        },

        set: function(key, obj) {

            if (this.externalJson) {
                this.set_inJson(key, obj);
            } else {
                this.set_inDoc(key, obj);
            }
        },

        set_inJson: function(key, obj) {

            var pref = {};
            pref[key] = obj;

            // if the prefs file exists extend it
            if ( signalwerk.file.exists(this.externalJsonPath) ) {

                var prefFile = signalwerk.file.read( this.externalJsonPath );
                var prefOld = JSON.parse(prefFile);
                pref = _.extend(prefOld, pref);
            }
            
            var ext = signalwerk.file.write(this.externalJsonPath, JSON.stringify(pref));


            return true;
        },

        set_inDoc: function(key, obj) {

            var myDoc = this.parent.doc();
            if (myDoc) {
                myDoc.insertLabel(key, JSON.stringify(obj));
                return true;
            } else {
                return false;
            }

        },

        get: function(key) {

            if (this.externalJson) {
                return this.get_inJson(key);
            } else {
                return this.get_inDoc(key);
            }

        },

        get_inDoc: function(key) {


            var myDoc = this.parent.doc();
            if (myDoc) {

                var returnState = false;
                try {
                    returnState = JSON.parse(myDoc.extractLabel(key));
                } catch (e) {
                    returnState = false;
                } finally {
                    return returnState;
                }

            } else {
                return false;
            }

        },
        
        get_inJson: function(key) {

            // if the prefs file exists extend it
            if ( !signalwerk.file.exists(this.externalJsonPath) ) {
                return false;
            }
            
            var prefFile = signalwerk.file.read( this.externalJsonPath );
            var pref = JSON.parse(prefFile);
            
            if (pref.hasOwnProperty(key)) {
                return pref[key];
            } else {
                return false;
            }

        }
    });

    return _s;

}( this.signalwerk || {} ));
