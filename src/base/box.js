import console from "./console.js";

class Box {
  // upper left  Y-Coordinate
  // upper left  X-Coordinate
  // lower right Y-Coordinate
  // lower right X-Coordinate

  constructor(parent) {
    this._parent = parent;
  }

  x(value) {
    if (value !== undefined) {
      this._parent.geometricBounds = [
        this._parent.geometricBounds[0],
        value,
        this._parent.geometricBounds[2],
        value +
          this._parent.geometricBounds[3] -
          this._parent.geometricBounds[1]
      ];

      return this;
    } else {
      return this.left();
    }
  }
  y(value) {
    if (value !== undefined) {
      this._parent.geometricBounds = [
        value,
        this._parent.geometricBounds[1],
        value +
          this._parent.geometricBounds[2] -
          this._parent.geometricBounds[0],
        this._parent.geometricBounds[3]
      ];

      return this;
    } else {
      return this.left();
    }
  }

  bboxSetter(index, value) {
    if (value !== undefined) {
      let oldBox = this._parent.geometricBounds;
      oldBox[index] = value;
      this._parent.geometricBounds = oldBox;

      return this;
    } else {
      return this._parent.geometricBounds[index];
    }
  }
  top(n) {
    return this.bboxSetter(0, n);
  }

  left() {
    return this.bboxSetter(1, n);
  }

  bottom() {
    return this.bboxSetter(2, n);
  }
  right() {
    return this.bboxSetter(3, n);
  }
  height() {
    return this._parent.geometricBounds[2] - this._parent.geometricBounds[0];
  }

  width() {
    return this._parent.geometricBounds[3] - this._parent.geometricBounds[1];
  }
}

export default Box;
