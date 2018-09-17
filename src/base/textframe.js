import console from "./console.js";
import { mm2pt } from "./unit.js";
import Box from "./Box.js";

let _selectWhere = function(array, key, value) {
  return array.filter(item => {
    if (item.hasOwnProperty(key) && item[key] === value) {
      return true;
    } else {
      return false;
    }
  });
};

let getByLabel = function(myDoc, labelStr) {
  var allTextFrames = myDoc.textFrames.everyItem().getElements();

  var textFrames = _selectWhere(allTextFrames, "label", labelStr);

  if (textFrames.length === 0) {
    return null;
    // throw "there is no textframe with the label " + labelStr;
  }
  if (textFrames.length > 1) {
    return null;
    // throw "there is more than one textframe with the name " + labelStr;
  }

  return new Textframe(textFrames[0]);
};

class Textframe {
  constructor(frame) {
    this._frame = frame;
    this.box = {
      top: value => new Box(this._frame).top(value),
      left: value => new Box(this._frame).left(value),
      bottom: value => new Box(this._frame).bottom(value),
      right: value => new Box(this._frame).right(value),
      x: value => new Box(this._frame).x(value),
      y: value => new Box(this._frame).y(value),
      height: value => new Box(this._frame).height(value),
    };
  }

  placeICML(path, unlink) {
    let icmlFile = File(path);

    this._frame.place(icmlFile);

    // optional unlink
    if (unlink) {
      let doc = this._frame.parentPage.parent.parent; // page // spread // doc

      for (var i = doc.links.length - 1; i >= 0; i--) {
        var currentFile = File(doc.links[i].filePath);

        if (currentFile.fsName === icmlFile.fsName) {
          doc.links[i].unlink();
        }
      }
    }
  }
  pure() {
    return this._frame;
  }

  addHeight(orientation, by) {
    this._frame.resize(
      CoordinateSpaces.INNER_COORDINATES,
      orientation || AnchorPoint.BOTTOM_LEFT_ANCHOR,
      ResizeMethods.ADDING_CURRENT_DIMENSIONS_TO,
      [0, by]
    );
  }

  fitHeight(orientation, _threshold, _step) {
    let threshold = _threshold || mm2pt(1);
    let step = _step || mm2pt(10);
    if (threshold > step) {
      return;
    }
    if (this.box.height() <= threshold) {
      return;
    }

    if (this._frame.overflows) {
      while (this._frame.overflows) {
        this.addHeight(orientation, step);
      }
    } else {
      while (!this._frame.overflows) {
        this.addHeight(orientation, 0 - step);
      }
      this.addHeight(orientation, step);
    }

    this.fitHeight(orientation, threshold, step / 10);
  }
}

export { getByLabel };

export default Textframe;
