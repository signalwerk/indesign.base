import Document from './document.js'
import console from './console.js'
import {pt2mm} from './unit.js'

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
