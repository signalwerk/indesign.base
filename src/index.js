//@target indesign

// /Applications/Adobe\ ExtendScript\ Toolkit\ CC/ExtendScript\ Toolkit.app/Contents/MacOS/ExtendScript\ Toolkit -run index.js

// Documents/Adobe Scripts folder = trusted location

import Document from "./base/document.js";
import console from "./base/console.js";
import Box from "./base/Box.js";
import { mm2pt, pt2mm } from "./base/unit.js";
// import {fitHeight} from './fit.js'

// console.clear();

let doc = new Document();

let open = path => doc.open(path);
let save = path => doc.save(path);
// let importIcml = path => {
//   place("importMainText", path)
// };

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

  doc._doc.pages
    .everyItem()
    .resize(
      CoordinateSpaces.INNER_COORDINATES,
      AnchorPoint.TOP_LEFT_ANCHOR,
      ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
      [mm2pt(oldPageWidth), mm2pt(oldPageHeight - reducedHeight)]
    );

  // doc._doc.documentPreferences.pageWidth = 299
  // doc._doc.documentPreferences.pageHeight = 320
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
  // let textframe = doc.textframes.getByLabel('importMainText');
};

// open(
//   "/Users/glender/Dropbox/automagnet/4_Druckunterlagen/KW37/1_KulturMagnet_NZZ_KW37_2018_Mo__TEST-2.indd"
// );

// placeIcml(
//   "importMainText",
//   "/Users/glender/Dropbox/automagnet/4_Druckunterlagen/KW37/_temp/cjlodep7o02il0879agqoypiv/magnet.icml"
// );
//

// setInfo('info', "Infozeile")

// alert("done");

// msg("final");
// resize();

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

// let config = {
//   document: "/Users/glender/Desktop/CODE_GIT/indesign.base/index.indd",
//   textframe: "test-label"
// };
//
// console.clear();
//
// let doc = new Document();
// // console.log(doc, doc.textframes);
//
// doc.open(config.document);
//
// let textframe = doc.textframes.getByLabel(config.textframe);
//
// let originalTop = textframe.box.top();
// textframe.fitHeight(AnchorPoint.BOTTOM_LEFT_ANCHOR);
// let reducedHeight = textframe.box.top() - originalTop;
//
// console.log("reducedHeight", reducedHeight);
// // console.log("test");
// // console.log('box top:', frame.box.top = 88 );
// // console.log("test");
// // let kk = "Kk";

// fitTextFrameHeight(frame.pure(), 10, 0.01);

//
// console.log('box top:', frame.box.top() );
// console.log('box top:', frame.box.top(10) );

// console.log("end");
