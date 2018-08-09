import console from './console.js'
import {mm2pt} from './unit.js'


let _selectWhere = function(array, key, value) {

    return array.filter(item => {

        if (item.hasOwnProperty(key) && item[key] === value) {
            return true;
        } else {
            return false;
        }
    });
}

let getByLabel = function(myDoc, labelStr) {
    var allTextFrames = myDoc.textFrames.everyItem().getElements();

    var textFrames = _selectWhere(allTextFrames, "label", labelStr);

    if(textFrames.length === 0) {
        throw "there is no textframe with the label " + labelStr;
    }
    if(textFrames.length > 1) {
        throw "there is more than one textframe with the name " + labelStr;
    }

    return new Textframe(textFrames[0]);

};


class Textframe {
  constructor(frame) {
    this._frame = frame;
  }

  placeICML(icmlFile, unlink) {
    this._frame.place(icmlFile);

    // optional unlink
    if(unlink) {
      // dok.links.itemByName(icmlFile.name).unlink();
    }
  }
  pure() {
    return this._frame
  }

  addHeight(orientation, by) {
    this._frame.resize(
      CoordinateSpaces.INNER_COORDINATES,
      orientation || AnchorPoint.BOTTOM_LEFT_ANCHOR,
      ResizeMethods.ADDING_CURRENT_DIMENSIONS_TO,
      [0, by]
    );
  }

  fitHeight(orientation, _step, _threshold) {
    let step = _step || mm2pt(10)
    let threshold = _threshold || mm2pt(0.1)
            if(threshold > step) {
              return
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


    this.fitHeight(orientation, step/10, threshold)
  }

  height(){
    let bbox = this.bbox();
    return bbox[2] - bbox[0];
  }

  width(){
    let bbox = this.bbox();
    return  bbox[3] - bbox[1];
  }

  bbox(){
    // upper left  Y-Coordinate
    // upper left  X-Coordinate
    // lower right Y-Coordinate
    // lower right X-Coordinate
    return this._frame.geometricBounds;
  }
}

export { getByLabel };

export default Textframe;
