//  jsonML
// 

var emanuelaMD = "/Users/glender/Dropbox/Shares/DiplomEmanuelaJacober/_Infos/Infos.txt";


var fs = require('fs');
// var content = fs.readFileSync(emanuelaMD);
var content = fs.readFileSync(emanuelaMD, "utf8");

// console.log(content);





var marked = require('marked');

// var md = JSON.stringify(marked.lexer('I am using __markdown__.'))
var md = JSON.stringify(marked.lexer(content))



console.log( md );




// console.log(marked('I am using __markdown__.'));


