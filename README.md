TTLMap
======

![TTLMap](./imgs/TTLMap.png)

Wraps JavaScript's `Map` with a Time To Live (TTL). For long running programs, this can help prevent memory leaks in certain cases.

# Features

* Drop in replacement for `Map`
* Adds a Time To Live to Map Values, defaults to `Infinity`.
* Supports all versions of Node.js 0.11+
* Robust and well tested
  * 100% test coverage
  * Simple, easy to maintain, code base.

# Use case

If you store callbacks for outbound connections that you expect an eventual reply to, you may find that a reply never comes. For a single request, this may not be a big deal, but for a long running process over billions of requests you may find your process runs out of memory. Setting an upper limit to the amount of time you will hold onto a callback for any request will allow you to protect against memory leaks.

# Usage

Exactly the same as a `Map` (including the es6 `for...of` syntax), except for one notable exception:

```
var Map = require('ttlmap');
var m = new Map();

m.set('foo', 'bar', 1000);
```

There is an optional third parameter for `Map.set`, a TTL in milliseconds. The same assurances of `setTimeout` are made of TTLs, there is no guarantee of precise timing nor of ordering.

# License

GPLv3
