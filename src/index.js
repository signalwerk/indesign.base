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
let importIcml = path => {
  let textframe = doc.textframes
    .getByLabel("importMainText")
    .placeICML(path, doc._doc, "magnet.icml");
};

let resize = path => {
  let textframe = doc.textframes.getByLabel("importMainText");
  //
  let originalTop = textframe.box.top();
  textframe.fitHeight(AnchorPoint.BOTTOM_LEFT_ANCHOR);
  let reducedHeight = textframe.box.top() - originalTop;

  textframe.box.y(textframe.box.top() - reducedHeight);

  let frame = doc.getByLabel("formatframe");

  let frameBox = new Box(frame);

  frameBox.bottom(frameBox.bottom() - reducedHeight);

  var myPage = doc._doc.pages[0];

  var oldPB = myPage.bounds;

  let oldPageHeight = oldPB[2] - oldPB[0];

  let oldPageWidth = oldPB[3] - oldPB[1];

  // alert(oldPageWidth+"x"+oldPageHeight)
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

let setInfo = info => {
  console.log("no setInfo");
  // let textframe = doc.textframes.getByLabel('importMainText');
};

let pdf = path => {
  console.log("no pdf");
  // let textframe = doc.textframes.getByLabel('importMainText');
};

let close = path => doc.close();

let msg = msg => {
  alert(msg);
  // let textframe = doc.textframes.getByLabel('importMainText');
};

// open(
//   "/Users/glender/Dropbox/automagnet/4_Druckunterlagen/KW37/1_KulturMagnet_NZZ_KW37_2018_Mo__TEST-2.indd"
// );




alert("done");

// msg("final");
// resize();


let signalwerk_id = {
  open,
  save,
  importIcml,
  resize,
  setInfo,
  pdf,
  close,
  msg,
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
