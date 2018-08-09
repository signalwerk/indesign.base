const console = {};

console.log = function() {
  for (var i = 0; i < arguments.length; ++i) {
    $.write(arguments[i]);
       $.write(' ');
  }
    $.writeln();
};

// console.log = msg => {
//   for (var i = 0; i < arguments.length; ++i) {
//     $.write(arguments[i]);
//     $.write(' ');
//   }
//
//   $.writeln();
// };

console.json = msg => {
    console.log(JSON.stringify(msg, null, 4));
};

console.keys = obj => {

   const keys = [];
   for(const key in obj){
      keys.push(key);
   }
   console.log(JSON.stringify(keys, null, 4));
};

console.error = msg => {
   console.log(`!! ERROR: ${msg}`);
};

console.clear = () => {

  if (app.name === "ExtendScript Toolkit") {
    app.clc();
  }
  else {
    const estApp = BridgeTalk.getSpecifier("estoolkit");
    if(estApp) {
      const bt = new BridgeTalk;
      bt.target = estApp;
      bt.body = "app.clc()";
      bt.send();
    }
  }
};


export default console;
