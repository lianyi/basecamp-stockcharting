'use strict';
const request = require('request');

const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const getStockDataUrlByName = function (name) {
  if (!QUANDL_API_KEY) {
    console.warn('missing QUANDL_API_KEY in ENV!');
    process.exit(-1);
  }
  const now = new Date(), year = now.getFullYear(), month = now.getMonth() + 1, date = now.getDate();
  return {
    dataUrl: `https://www.quandl.com/api/v3/datasets/WIKI/${name.toUpperCase()}.json?api_key=${QUANDL_API_KEY}&start_date=${year - 1}-${month}-${date}&end_date=${year}-${month}-${date}`,
    metaUrl: `https://www.quandl.com/api/v3/datasets/WIKI/${name.toUpperCase()}/metadata.json`
  };
};


const getStockData = function (name) {
  return new Promise((resolve, reject) => {
    request({uri: getStockDataUrlByName(name).dataUrl}, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        const data = JSON.parse(body);
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

const getStockMeta = function (name) {
  return new Promise((resolve, reject) => {
    request({uri: getStockDataUrlByName(name).metaUrl},
      (err, res, body) => {
        if (!err && res.statusCode === 200) {
          const data = JSON.parse(body);
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
