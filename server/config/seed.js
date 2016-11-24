/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Stock from '../api/stock/stock.model';

Stock.find({}).remove()
  .then(() => {
    Stock.create({
      "name": "Costco Wholesale Corp (COST) Prices, Dividends, Splits and Trading Volume",
      "code": "COST"
    }, {

      "name": "Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume",
      "code": "AAPL"
    });
  });

