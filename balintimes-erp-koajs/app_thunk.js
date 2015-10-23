var fs = require('fs');
var thunkify = require('thunkify');
var co = require("co");
var readFile = thunkify(fs.readFile);


readFile('/etc/fstab')(function(err,data){
		console.log("##### begin ######");
	 console.log(data.toString());
	 console.log("##### end ######");
});



var gen = function* (){
  var r1 = yield readFile('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFile('/etc/shells');
  console.log(r2.toString());
};

co(gen);
// var g = gen();

// var r1 = g.next();

// r1.value(function(err, data){
//   if (err) throw err;
//   var r2 = g.next(data);
//   r2.value(function(err, data){
//     if (err) throw err;
//     g.next(data);
//   });
// });

function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}