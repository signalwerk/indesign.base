import { getByLabel } from "./textframe.js";

let _bar = 1;

let _selectWhere = function(array, key, value) {
  return array.filter(item => {
    if (item.hasOwnProperty(key) && item[key] === value) {
      return true;
    } else {
      return false;
    }
  });
};

class Document {
  constructor(height, width) {
    this._doc = null;


    this.textframes = {
      getByLabel: label => getByLabel(this._doc, label)
    };

    try{
      this._doc = app.activeDocument; //  get the acitve document
      }catch(e){
        // oh oh no active doc
        // alert("You have no document open!\n" +e);
        return;
      }
  }

  getByLabel(labelStr) {
    var allPageItems = this._doc.allPageItems;

    var pageItems = _selectWhere(allPageItems, "label", labelStr);

    if (pageItems.length === 0) {
      return null;
      // throw "there is no item with the label " + labelStr;
    }
    if (pageItems.length > 1) {
      return null;
      // throw "there is more than one item with the name " + labelStr;
    }

    return pageItems[0];
  };



  open(inFile, showWindow) {
    var finalFile = inFile;
    var showWindow = showWindow || true;

    if (inFile.constructor.name == "String") {
      finalFile = File(inFile);
    }

    this._doc = app.open(finalFile, showWindow, OpenOptions.OPEN_ORIGINAL);

    return this._doc;
  }

  close(saveFirst) {
    if (saveFirst) {
      this._doc.close(SaveOptions.YES);
    } else {
      this._doc.close(SaveOptions.NO);
    }
  }

  save(savePath) {
    if (savePath) {
      this._doc.save(savePath);
    } else {
      this._doc.save();
    }
  }
}

export default Document;
