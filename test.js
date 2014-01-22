var tap = require("tap")
  , test = tap.test
  , FastList = require("./fast-list.js")

test(function (t) {
  var list = new FastList()
  list.push("foo")
  t.equal(list._head, list._tail, "should have only one thing")
  list.push("bar")
  list.push("baz")
  list.push("boo")
  list.push("asd")
  list.push("dsa")
  list.push("elf")
  list.push("fro")
  list.push("gap")
  list.push("hoo")
  list.push("ike")
  list.push("jut")
  list.push("kni")
  list.push("lam")
  list.push("mut")
  list.push("nop")
  list.push("orc")
  t.equal(list.length, 17, "length = 17")
  t.equal(list.pop(), "orc", "pop orc")
  t.equal(list.shift(), "foo", "shift foo")
  t.equal(list.length, 15, "length = 15")

  t.equal(list.item(0), "bar", "item 0 = bar")

  t.equal(list.item(1), "baz", "item 1 = baz")
  t.equal(list.item(-0), "bar", "item -0 = bar")
  t.equal(list.item(-1), "nop", "item -1 = nop")
  t.equal(list.item(-5), "jut", "item -5 = jut")
  t.equal(list.item(10), "jut", "item 10 = jut")

  t.equal(list.item(5), "elf", "item 5 = elf")

  t.deepEqual(list.slice(),
    ["bar"
    ,"baz"
    ,"boo"
    ,"asd"
    ,"dsa"
    ,"elf"
    ,"fro"
    ,"gap"
    ,"hoo"
    ,"ike"
    ,"jut"
    ,"kni"
    ,"lam"
    ,"mut"
    ,"nop"], "slice()")

  t.deepEqual(list.slice(0), list.slice(), "slice(0) == slice()")

  t.deepEqual(list.slice(0, 1), ["bar"], "slice(0, 1)")

  t.deepEqual(list.slice(5, 10),
    ["elf"
    ,"fro"
    ,"gap"
    ,"hoo"
    ,"ike"], "slice(5, 10)")

  t.deepEqual(list.slice(5, -2),
    ["elf"
    ,"fro"
    ,"gap"
    ,"hoo"
    ,"ike"
    ,"jut"
    ,"kni"
    ,"lam"], "slice(5, -2)")

  t.deepEqual(list.slice(-4),
    ["kni"
    ,"lam"
    ,"mut"
    ,"nop"], "slice(-4)")

  // verify that map, reduce, and filter all match their
  // array counterparts.  This implies forEach coverage as well,
  // since map and filter rely on it.
  function reduce (l, r) {
    l[r] = true
    return l
  }
  t.deepEqual( list.reduce(reduce, {})
             , list.slice().reduce(reduce, {})
             , "reduce")

  // filter out the first three items
  function filter (v) {
    return v.charAt(0) !== "b"
  }
  t.deepEqual( list.filter(filter).slice()
             , list.slice().filter(filter)
             , "filter")

  // double all the items
  function map (v) {
    return v + v
  }
  t.deepEqual( list.map(map).slice()
             , list.slice().map(map)
             , "map")

  t.end()
})
test(function(t){
	 var list = new FastList()
  var first = list.push("foo")
  list.push("bar")
  list.push("baz")
  list.push("boo")
  list.push("asd")
  list.push("dsa")
  list.push("elf")
  list.push("fro")
  var middle = list.push("gap");
  var middle2 = list.push("hoo")
  list.push("ike")
  list.push("jut")
  list.push("kni")
  list.push("lam")
  list.push("mut")
  list.push("nop")
  var last = list.push("orc");
  
  t.equal(list.remove(first), "foo", "list.remove(first) == foo");
  t.equal(list.remove(middle), "gap", "list.remove(gap) == gap");
  t.equal(list.remove(last), "orc", "list.remove(last) == orc");

  /*checkConsistency(t, list, ['bar', 'baz', 'boo', 'asd', 'dsa', 'elf',
  'fro', 'hoo', 'ike', 'jut', 'kni', 'lam', 'mut', 'nop']);*/
  
  first = list._head;
  last = list._tail;
  middle = middle2;
  
  b_first = list.insertBefore(first, 'beforeFirst');
  a_first = list.insertAfter(first, 'afterFirst');
  
  b_middle = list.insertBefore(middle, 'beforeMiddle');
  a_middle = list.insertAfter(middle, 'afterMiddle');
  
  b_last = list.insertBefore(last, 'beforeLast');
  a_last = list.insertAfter(last, 'afterLast');
  checkConsistency(t, list, ['beforeFirst', 'bar', 'afterFirst',
  'baz', 'boo', 'asd', 'dsa', 'elf', 'fro', 'beforeMiddle', 'hoo', 'afterMiddle',
  'ike', 'jut', 'kni', 'lam', 'mut', 'beforeLast', 'nop', 'afterLast']);
  
  
  t.end();
})
function checkConsistency(t, list, entries){
	var prev = null
	var entry = list._head
	var total = 0
	var visited = []
	var consistent
	while(entry){
		if(visited.indexOf(entry) != -1){
			throw new Error('List became a circle! Entry '+entry.data+' encountered twice');
		}
		consistent = true;
		visited.push(entry);
		if(entries){
			consistent = entry.data == entries[total];
		}
		consistent == consistent && (entry == list._head || entry.prev && entry.prev.next == entry)
		consistent == consistent && (entry == list._tail || entry.next && entry.next.prev == entry)
		t.assert(consistent, 'entry '+entry.data+' is consistent');
		entry = entry.next;
		++total;
	}
	t.equal(total, list.length, 'entry count equals reported length');
}


