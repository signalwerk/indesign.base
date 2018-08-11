//@target indesign

// /Applications/Adobe\ ExtendScript\ Toolkit\ CC/ExtendScript\ Toolkit.app/Contents/MacOS/ExtendScript\ Toolkit -run index.js

// Documents/Adobe Scripts folder = trusted location

import Document from "./base/document.js";
import console from "./base/console.js";
import { mm2pt } from "./base/unit.js";
// import {fitHeight} from './fit.js'

let config = {
  document: "/Users/glender/Desktop/CODE_GIT/indesign.base/index.indd",
  textframe: "test-label"
};

console.clear();

let doc = new Document();
// console.log(doc, doc.textframes);

doc.open(config.document);

let textframe = doc.textframes.getByLabel(config.textframe);

let originalTop = textframe.box.top();
textframe.fitHeight(AnchorPoint.BOTTOM_LEFT_ANCHOR);
let reducedHeight = textframe.box.top() - originalTop;

console.log("reducedHeight", reducedHeight);
// console.log("test");
// console.log('box top:', frame.box.top = 88 );
// console.log("test");
// let kk = "Kk";

// fitTextFrameHeight(frame.pure(), 10, 0.01);

//
// console.log('box top:', frame.box.top() );
// console.log('box top:', frame.box.top(10) );

console.log("end");
