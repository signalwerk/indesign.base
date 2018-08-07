
// gosh... Adobe...
var console = {};
console.log = function(msg) {
    $.writeln(msg);
};
console.json = function(msg) {
    console.log(JSON.stringify(msg, null, 4));
};

console.keys = function(obj) {

   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   console.log(JSON.stringify(keys, null, 4));
};

console.error = function(msg) {
   console.log("!! ERROR: " + msg);
};

console.clear = function() {



  if (app.name === "ExtendScript Toolkit") { 
    app.clc(); 
  }
  else {
    var estApp = BridgeTalk.getSpecifier("estoolkit");
    if(estApp) {
      var bt = new BridgeTalk;
      bt.target = estApp;
      bt.body = "app.clc()";
      bt.send();
    }
  }

/*
   btString = "estoolkit";
   bt = new BridgeTalk(btString);
   bt.body = "app.clc()";
   bt.target = btString;
   bt.send();
    */
};
