﻿(function(_s) {

    // constructors
    _s._textFrames = klass(function(parent) {
        this.parent = parent;
    });

    _s._textFrames.methods({

        getByLabel: function(labelStr) {
            var myDoc = this.parent.doc();
            var allTextFrames = myDoc.textFrames.everyItem().getElements();

            var textFrames = this._selectWhere(allTextFrames, "label", labelStr);

            if(textFrames.length !== 1) {
                throw "holy guacamole! there is more than one textframe with the name " + labelStr;
            }
            return textFrames[0];

        },

        // add the text to a textframe
        appendIdtt: function(tBox, inFile) {
            var finalFile = inFile;

            if (inFile.constructor.name == "String") {
                finalFile = File(inFile);
            }

            if (!finalFile.exists) {
                throw "IDTT-File does not exist.";
            }

            //-- Setup the Import Preferences for Tagged Text files
            app.taggedTextImportPreferences.removeTextFormatting = false;
            app.taggedTextImportPreferences.styleConflict = StyleConflict.PUBLICATION_DEFINITION;
            // app.taggedTextImportPreferences.styleConflict = StyleConflict.TAG_FILE_DEFINITION ;
            app.taggedTextImportPreferences.useTypographersQuotes = false;

            //--  prevent any user interaction.
            var oaspuil = app.scriptPreferences.userInteractionLevel;
            app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

            //-- Now place the file 
            var placeResults = tBox.parentStory.insertionPoints.item(-1).place(finalFile, /*showing-option*/ false);


            //-- return the user interaction levels
            app.scriptPreferences.userInteractionLevel = oaspuil;


        },


        // add the text to a textframe
        replaceByIdtt: function(tBox, inFile) {

            // delet non empty boxes
            if (tBox.parentStory.contents !== "") {
                tBox.parentStory.remove();
            }

            this.appendIdtt(tBox, inFile);

        },

        getOnlySeleted: function() {


            if (app.selection.length == 1) {

                var textFrame = false;

                switch (app.selection[0].constructor.name) {
                    case "TextFrame":
                        textFrame = app.selection[0];
                        break;
                    default:
                        //If text is selected, then get the parent text frame. 
                        switch (app.selection[0].constructor.name) {
                            case "Cell":
                                textFrame = app.selection[0].insertionPoints[0].parentTextFrames[0];
                                break;
                            case "Text":
                                //case "Cell":
                            case "InsertionPoint":
                            case "Character":
                            case "Word":
                            case "Line":
                            case "TextStyleRange":
                            case "Paragraph":
                            case "TextColumn":
                                textFrame = app.selection[0].parentTextFrames[0];
                                break;
                        }
                        break;
                }

                if (textFrame) {
                    return textFrame;
                }
            }

            return false;

        },



        _selectWhere: function(array, key, value) {

            return _.filter(array, function(item) {

                if (item.hasOwnProperty(key) && item[key] === value) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    });

    return _s;

}(this.signalwerk || {}));
