import { getByLabel } from "./textframe.js";

let _bar = 1;

class Document {
  constructor(height, width) {
    this._doc = null;
    this.textframes = {
      getByLabel: label => getByLabel(this._doc, label)
    };
  }

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
