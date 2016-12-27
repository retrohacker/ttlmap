var test = require('tape');
var Map = require('../index.js');

test('Constructor works', function(t) {
  var m = new Map();
  t.ok(m instanceof Map, 'Constructor returns instance of map');
  m = Map();
  t.ok(m instanceof Map, 'Constructor works without new keyword');
  t.end();
});

test('Timeout works', function(t) {
  var m = new Map();
  t.equal(m.set('foo', 'bar', 1), m, 'Insert works');
  t.equal(m.get('foo'), 'bar', 'Insert creates value');
  setTimeout(function () {
    t.equal(m.get('foo'), undefined, 'Values cleared after TTL');
    t.end();
  }, 2);
});

test('Timeouts update', function(t) {
  var m = new Map();
  t.equal(m.set('foo', 'bar', 10), m, 'Insert works');
  t.equal(m.get('foo'), 'bar', 'Insert creates value');
  t.equal(m.set('foo', 'buzz', 20), m, 'Update works');
  t.equal(m.get('foo'), 'buzz', 'Update updates value');
  setTimeout(function () {
    t.equal(m.get('foo'), 'buzz', 'Original TTL cleared');
  }, 15);
  setTimeout(function () {
    t.equal(m.get('foo'), undefined, 'New TTL is triggered');
    t.end();
  }, 30);
});

test('Array constructor works', function(t) {
  var m = new Map([['foo','bar']]);
  t.equal(m.get('foo'), 'bar', 'Populated');
  t.end();
});

test('clear', function (t) {
  var m = new Map();
  m.set('foo', 'bar');
  m.set('buzz', 'bazz');
  m.clear();
  t.equal(m.get('foo'), undefined, 'foo cleared');
  t.equal(m.get('buzz'), undefined, 'bazz cleared');
  t.end();
});

test('delete', function (t) {
  var m = new Map();
  m.set('foo', 'bar');
  t.equal(m.delete('foo'), true, 'First delete removes');
  t.equal(m.delete('foo'), false, 'Second delete has no effect');
  t.end();
});

test('entries, keys, values', function (t) {
  var m = new Map();
  m.set('foo', 'bar');
  m.set('buzz', 'bazz');
  var actual = m.entries();
  var expected = [['foo', 'bar'], ['buzz', 'bazz']];
  var i, j;
  for(i = 0; i < expected.length; i++) {
    var a = actual.next().value;
    for(j = 0; j < expected[i].length; j++) {
      t.equal(a[j], expected[i][j], 'Array Equal');
    }
  }

  actual = m.keys();
  expected = ['foo', 'buzz'];
  for(i = 0; i < expected.length; i++) {
    t.equal(actual.next().value, expected[i], 'Array Equal');
  }

  actual = m.values();
  expected = ['bar', 'bazz'];
  for(i = 0; i < expected.length; i++) {
    t.equal(actual.next().value, expected[i], 'Array Equal');
  }

  t.end();
});

test('foreach', function (t) {
  t.plan(2);
  var m = new Map();
  m.set('foo', 'bar');
  m.set('buzz', 'bazz');
  m.forEach(function() {
    t.pass('Invoking function');
  });
});

test('has', function (t) {
  var m = new Map();
  m.set('foo', 'bar');
  t.equal(m.has('foo'), true);
  t.equal(m.has('buzz'), false);
  t.end();
});

test('for...in', function (t) {
  // Feature detection
  if(!Symbol || !Symbol.iterator) {
    t.pass('Iterator not supported');
    return t.end();
  }

  t.plan(4);
  var m = new Map();
  m.set('foo', 'bar');
  m.set('buzz', 'bazz');
  var expected = [["foo", "bar"], ["buzz", "bazz"]];
  var i = 0;
  for(var v of m) {
    var e = expected[i++];
    for(var j = 0; j < v.length; j++) {
      t.equal(v[j], e[j], 'Array equal');
    }
  }
});
