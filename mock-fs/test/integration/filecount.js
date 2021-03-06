var fs = require('fs');
var path = require('path');


/**
 * Count the number of files in a directory.
 * @param {string} dir Path to directory.
 * @param {function(Error, number)} callback Callback.
 */
module.exports = exports = function(dir, callback) {
  fs.readdir(dir, function(err, items) {
    if (err) {
      return callback(err);
    }
    numFiles(dir, items, callback);
  });
};

function numFiles(dir, items, callback) {
  var total = items.length,
      files = 0,
      completed = 0;

  if (total === 0) {
    callback(null, 0);
  }
  items.forEach(function(item) {
    fs.stat(path.join(dir, item), function(err, stats) {
      if (stats && stats.isFile()) {
        ++files;
      }
      ++completed;
      if (completed === total) {
        callback(null, files);
      }
    });
  });
}
