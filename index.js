var TTLMap = module.exports = function TTLMap(iterable) {
  if(!(this instanceof TTLMap)) {
    return new TTLMap(iterable);
  }

  this._ttls = new Map();
  this._values = new Map(iterable);
};

TTLMap.prototype.set = function set(key, value, ttl) {
  var hasttl = this._ttls.get(key);
  if(hasttl !== undefined) {
    this._ttls.delete(key);
    clearTimeout(hasttl);
  }
  this._values.set(key, value);
  this._ttls.set(key, setTimeout(this.delete.bind(this), ttl, key));
  return this;
};

TTLMap.prototype["delete"] = function _delete(key) {
  this._ttls.delete(key);
  return this._values.delete(key);
};

TTLMap.prototype.get = function get(key) {
  return this._values.get(key);
};

TTLMap.prototype.clear = function clear(key) {
  this._ttls.clear();
  return this._values.clear();
};

TTLMap.prototype.entries = function entries() {
  return this._values.entries();
};

TTLMap.prototype.keys = function keys() {
  return this._values.keys();
};

TTLMap.prototype.values = function values() {
  return this._values.values();
};

TTLMap.prototype.forEach = function forEach() {
  return this._values.forEach.apply(this._values, arguments);
};

TTLMap.prototype.has = function has() {
  return this._values.has.apply(this._values, arguments);
};

TTLMap.prototype[Symbol.iterator] = function iterator() {
  return this._values[Symbol.iterator].apply(this._values, arguments);
};
