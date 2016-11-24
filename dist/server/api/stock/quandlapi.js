'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');

var QUANDL_API_KEY = process.env.QUANDL_API_KEY;
var getStockDataUrlByName = function getStockDataUrlByName(name) {
  if (!QUANDL_API_KEY) {
    console.warn('missing QUANDL_API_KEY in ENV!');
    process.exit(-1);
  }
  var now = new Date(),
      year = now.getFullYear(),
      month = now.getMonth() + 1,
      date = now.getDate();
  return {
    dataUrl: 'https://www.quandl.com/api/v3/datasets/WIKI/' + name.toUpperCase() + '.json?api_key=' + QUANDL_API_KEY + '&start_date=' + (year - 1) + '-' + month + '-' + date + '&end_date=' + year + '-' + month + '-' + date,
    metaUrl: 'https://www.quandl.com/api/v3/datasets/WIKI/' + name.toUpperCase() + '/metadata.json'
  };
};

var getStockData = function getStockData(name) {
  return new _promise2.default(function (resolve, reject) {
    request({ uri: getStockDataUrlByName(name).dataUrl }, function (err, res, body) {
      if (!err && res.statusCode === 200) {
        var data = JSON.parse(body);
        if (!data || data.quandl_error) {
          reject(data);
        } else {
          resolve(data);
        }
      } else {
        reject(err);
      }
    });
  });
};

var getStockMeta = function getStockMeta(name) {
  return new _promise2.default(function (resolve, reject) {
    request({ uri: getStockDataUrlByName(name).metaUrl }, function (err, res, body) {
      if (!err && res.statusCode === 200) {
        var data = JSON.parse(body);
        if (!data || data.quandl_error) {
          reject(data);
        } else {
          resolve({
            name: data.dataset.name,
            code: data.dataset.dataset_code
          });
        }
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  getStockMeta: getStockMeta,
  getStockData: getStockData
};
//# sourceMappingURL=quandlapi.js.map
