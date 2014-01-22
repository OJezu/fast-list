var bench = require("bench")

//Fisher-Yates Shuffle
function shuffle(array) {
	var m = array.length;
	var t,new_pos;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		new_pos = Math.floor(Math.random() * m);
		--m;
		// And swap it with the current element.
		t = array[m];
		array[m] = array[new_pos];
		array[new_pos] = t;
	}
	return array;
}


var l = 5000
  , FastList = require("../fast-list.js")

exports.countPerLap = l * 2

exports.compare =
  { "random []": function () {
      var list = []
      for (var i = 0; i < l; i++) {
        list.push(i)
      }
      for (var i = 0; i < l; i++) {
        list = list.splice(Math.random()*(l-i-1), 1);
      }
    }
  , "random FastList()": function () {
      var list = new FastList();
      var order = [];
      for (var i = 0; i < l; i++) {
        order.push(list.push(i));
      }
      shuffle(order);
      for (var i = 0; i < l; i++) {
        list.remove(order[i]);
      }
    }
  }

bench.runMain()