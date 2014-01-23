var bench = require("bench")

/*
 * This benchmark compares the scenario of
 * randomly removing the elements in a queue
 * while maintaining order - something that
 * arrays are particularly poor at.
 */

//Fisher-Yates Shuffle
function shuffle(array) {
  var m = array.length
  var t,new_pos
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    new_pos = Math.floor(Math.random() * m)
    --m
    // And swap it with the current element.
    t = array[m]
    array[m] = array[new_pos]
    array[new_pos] = t
  }
  return array
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
        //remove a random element and shift the remaning
        //array entries so that we don't have a hole in 
        //the middle
        list = list.splice(Math.random()*(l-i-1), 1)
      }
    }
  , "random FastList()": function () {
      var list = new FastList()
      
      //this array will keep pointers to all
      //entries in list in a random order
      var order = []
      for (var i = 0; i < l; i++) {
        order.push(list.push(i))
      }
      //shuffle internally calls l times 
      //Math.random() (shuffle is O(n))
      shuffle(order)
      for (var i = 0; i < l; i++) {
        list.remove(order[i])
      }
    }
  }

bench.runMain()