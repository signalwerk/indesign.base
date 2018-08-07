﻿signalwerk = (function(_s) {


    var file = {};


    file.currentFolder = function(inFile) {

        return (new File($.fileName)).parent;
    };



    file.exists = function(inFile) {

        var finalFile = inFile;

        if (inFile.constructor.name == "String") {
            finalFile = File(inFile);
        }

        if (finalFile.exists) {
            return true;
        } else {
            return false;
        }
    };


    // http://extendscript.blogspot.ch/2009/09/verify-or-create-folder-method.html
    file.folder = function(inPath) {

        var finalPath = inPath;

        if (inPath.constructor.name == "String") {
            finalPath = Folder(inPath);
        }

        if (!finalPath.exists) {

            //-- Create an array like a stack of folders that will need
            //--  to be created.
            var foldersToCreate = new Array();
            //-- Create a local copy of the original folder
            //--  because it needs to be modified within
            //--  this routine.
            //--  Using the absoluteURI version of the name to point
            //--   all the way through to the sever. Only this version
            //--   of the activeFolder needs to use this absoluteURI
            //--   notation because.
            var activeFolder = new Folder(finalPath);

            //-- Loop through the path structure until every part of
            //--  of the folder path is checked. Any non-existanet
            //--  folder path will be added to the array to create.
            while (!activeFolder.exists) {
                //-- Add the activeFolder to the array of folders to create
                foldersToCreate.push(activeFolder);
                //-- Now get to the parent of the folder.
                //--  Can't use .parent because if the active folder
                //--   doesn't exist, it won't have a parent.
                activeFolder = new Folder(activeFolder.path);
            }
            //-- At this point we have an array of folders that need to be
            //--  created. The array will have one element too many because
            //--  of the final line of the
            while (foldersToCreate.length > 0) {
                //-- Remove the last item added to the array of folders to create
                activeFolder = foldersToCreate.pop();
                //-- Try to create this folder
                if (!activeFolder.create()) {
                    return false;
                } //-- end of if create
            } //-- end of lower while
        } //-- end of else from way up top

        //-- At this point the folder has to exist else we already returned false
        return finalPath;
    },


    file.read = function(inFile) {

        var finalFile = inFile;

        if (inFile.constructor.name == "String") {
            finalFile = File(inFile);
        }

        console.log(inFile);

        finalFile.open('r');
        if (finalFile !== '') {
            // alert("this is read only\n " + read_file.read());
            var csv = finalFile.read();
            finalFile.close();
            return csv;
        }

        return false;
    };

    file.write = function(inFile, str, strEncoding, strLineFeed) {

        var finalFile = inFile;

        if (inFile.constructor.name == "String") {
            finalFile = File(inFile);
        }

        var encoding = strEncoding || "UTF-8"; // "UTF-16LE" "BINARY"
        var lineFeed = strLineFeed || "Unix"; // "Unix" "Windows" "Macintosh"

        finalFile.lineFeed = lineFeed;

        if (File.isEncodingAvailable(encoding)) {
            finalFile.encoding = encoding;
        } else {
            console.error("The File Encoding was not aviable. Encoding: " + encoding);
        }


        finalFile.open('w');

        if (finalFile !== '') {
            finalFile.write(str);
            finalFile.close();
            return true;
        } else {
            console.error(filepath);
        }

        return false;

    };




    file._isMac = function() {

      return /(Macintosh)/i.test($.os);

    };


    file.openDialog = function(title, fileEnding, defaultPath) {



        _maskFile = function(myFile) {
            // console.log("----file: " + myFile.name);
            if (myFile.constructor.name == "Folder") {
                return true;
            }
            if (myFile.name.endsWith(fileEnding)) {
                return true;
            }
            return false;
        };




         if ( signalwerk.file._isMac() ) {
              return File.openDialog(title, _maskFile, false);
         } else {

            //  "Documents:*.doc;*.docx,RTF files:*.rtf"
              return File.openDialog(title, 'Documents (*' + fileEnding + '):*' + fileEnding);

         }


        //  var path = new File(defaultPath);
        //  var file = path.openDlg("Choose File:");
        //  while (file.alias) {
        //      file = file.resolve().openDlg("Choose File:");
        //  }
        
        // return File.openDialog(title, false);

    };



    _s.file = file;
    return _s;

}(this.signalwerk || {}));






// file deep create folders
// http://extendscript.blogspot.ch/2009/09/verify-or-create-folder-method.html

//  rev_file.encoding = "SHIFT_JIS";
//  rev_file.lineFeed = "UNIX";
// var logFile = new File(filePath);
// logFile.encoding = "UTF-16";
// http://jongware.mit.edu/idcs6js/pe_TextImportCharacterSet.html




/*
  // Определение платформы
  if ($.os.toLowerCase().indexOf("macintosh") != -1) {
    // Маки
    preferencesFileName = "~/Library/Preferences/ru.colorbox.trista-dpi.txt";
    preferences[kPrefsBackupFolder] = Folder.encode(Folder.myDocuments + "/Trista DPI backup/");
    tempFolder = Folder.temp + "/";
  } else if ($.os.toLowerCase().indexOf("windows") != -1) {
    // Виндовз
    preferencesFileName = Folder.userData + "/ru.colorbox.trista-dpi.txt";
    preferences[kPrefsBackupFolder] = Folder.myDocuments + "/Trista DPI backup/";
    tempFolder = Folder.temp + "/";
  }
*/