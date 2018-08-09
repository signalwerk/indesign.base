import Document from './base/document.js'
import console from './base/console.js'
import {mm2pt} from './base/unit.js'
// import {fitHeight} from './fit.js'


let doc = new Document();
// console.log(doc, doc.textframes);

doc.open('/Users/glender/Desktop/CODE_GIT/indesign.base/index.indd');

let frame = doc.textframes.getByLabel("test-label")


console.clear();
// console.log("test");
console.log('got frame:', frame.width() );
console.log('got frame:', frame.height() );
// console.log("test");
// let kk = "Kk";


// fitTextFrameHeight(frame.pure(), 10, 0.01);

frame.fitHeight(AnchorPoint.BOTTOM_LEFT_ANCHOR)


console.log('end' );
