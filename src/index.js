//@target indesign

// /Applications/Adobe\ ExtendScript\ Toolkit\ CC/ExtendScript\ Toolkit.app/Contents/MacOS/ExtendScript\ Toolkit -run index.js

// Documents/Adobe Scripts folder = trusted location

import Document from "./base/document.js";
import console from "./base/console.js";
import Box from "./base/Box.js";
import File from "./base/File.js";
import { mm2pt, pt2mm } from "./base/unit.js";
// import {fitHeight} from './fit.js'

// console.clear();

let doc = new Document();

let open = path => doc.open(path);
let save = path => doc.save(path);

let placeIcml = (label, path) => {
  let textframe = doc.textframes.getByLabel(label).placeICML(path, true);
};

let resizePage = reducedHeight => {
  // move events
  let textframe = doc.textframes.getByLabel("events");

  if (reducedHeight === 0 || !textframe) {
    return;
  }

  textframe.box.y(textframe.box.top() - reducedHeight);

  for (var i = 6; i > 0; i--) {
    let colframe = doc.textframes.getByLabel(`col${i}`);
    if (colframe) {
      colframe.box.y(colframe.box.top() - reducedHeight);
    }
  }

  // resize frame box
  let frame = doc.getByLabel("formatframe");
  if (frame) {
    let frameBox = new Box(frame);
    frameBox.bottom(frameBox.bottom() - reducedHeight);
  }
  // resize page
  let myPage = doc._doc.pages[0];
  let oldPageHeight = myPage.bounds[2] - myPage.bounds[0];
  let oldPageWidth = myPage.bounds[3] - myPage.bounds[1];

  let infoFile = new File();
  var docPath = doc._doc.fullName.fsName.replace(/\.indd$/, "");

  infoFile.write(
    `${docPath}.txt`,
    `Format: ${Math.round(oldPageWidth * 10) / 10}×${Math.round(
      (oldPageHeight - reducedHeight) * 10
    ) / 10} mm`
  );

  doc._doc.pages
    .everyItem()
    .resize(
      CoordinateSpaces.INNER_COORDINATES,
      AnchorPoint.TOP_LEFT_ANCHOR,
      ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
      [mm2pt(oldPageWidth), mm2pt(oldPageHeight - reducedHeight)]
    );
};

let resizeTextframe = label => {
  let textframe = doc.textframes.getByLabel(label); // "importMainText"
  //
  let originalTop = textframe.box.top();
  textframe.fitHeight(AnchorPoint.BOTTOM_LEFT_ANCHOR);
  let reducedHeight = textframe.box.top() - originalTop;
  return reducedHeight;
};

let setInfo = (label, info) => {
  let textframe = doc.textframes.getByLabel(label);

  if (textframe) {
    textframe._frame.contents = info;
  }
};

let pdf = path => {
  console.log("no pdf");
  // let textframe = doc.textframes.getByLabel('importMainText');
};

let remove = label => {
  let textframe = doc.textframes.getByLabel(label);
  if (textframe) {
    textframe._frame.remove();
  }
};

let close = path => doc.close();

let msg = msg => {
  alert(msg);
};

let signalwerk_id = {
  open,
  save,
  placeIcml,
  resizeTextframe,
  resizePage,
  setInfo,
  pdf,
  close,
  remove,
  msg
};

global.signalwerk_id = signalwerk_id;
