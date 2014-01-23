var bench = require("bench")

/*
 * This benchmark compares the scenario of
 * randomly removing the elements in a queue
 * while maintaining order - something that
 * arrays are particularly poor at.
 */

/* it would be faster if (as in a real scenario)
 * we wouldn't be removing a random entry, and
 * having O(l) list.entry() call each loop.
 * If we got a pointer to list.remove in O(1) time
 * instead, then well... (see unfair version of this)
 */

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
        list = list.splice(Math.random()*(l-i-1), 1)
      }
    }
  , "random FastList()": function () {
      var list = new FastList()
      for (var i = 0; i < l; i++) {
        list.push(i)
      }
      for (var i = 0; i < l; i++) {
        list.remove(list.entry(Math.random()*(l-i-1)))
      }
    }
  }

bench.runMain()
