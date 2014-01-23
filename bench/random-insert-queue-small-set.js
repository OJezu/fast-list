var bench = require("bench")

var l = 50
  , FastList = require("../fast-list.js")

exports.countPerLap = l
//exports.stepsPerLap = 10


exports.compare =
  { "random []": function () {
      var list = []
      for (var i = 0; i < l; i++) {
        list.splice(Math.random()*(list.length+1), 0, i)
      }
    }
  , "random FastList()": function () {
      var list = new FastList()
      var map = [null]
      for (var i = 0; i < l; i++) {
        var before = map[Math.random()*map.length]
        if(!map[before]){
        	map.push(list.push(i))
        } else {
        	map.insertBefore(map[before], i)
        }
      }
    }
  }

bench.runMain()
