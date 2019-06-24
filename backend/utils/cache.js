const NodeCache = require("node-cache");
const myCache = new NodeCache();

function caching(key, fn, cb) {
  myCache.get(key, function(err, value) {
    if (value) {
      cb(err, value);
    } else {
      let payload = fn();
      myCache.set(key, payload, function(err, success) {
        cb(err, payload);
      });
    }
  });
}

module.exports.caching = caching;
