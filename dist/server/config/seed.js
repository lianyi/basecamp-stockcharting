/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _stock = require('../api/stock/stock.model');

var _stock2 = _interopRequireDefault(_stock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_stock2.default.find({}).remove().then(function () {
  _stock2.default.create({
    "name": "Costco Wholesale Corp (COST) Prices, Dividends, Splits and Trading Volume",
    "code": "COST"
  }, {

    "name": "Apple Inc (AAPL) Prices, Dividends, Splits and Trading Volume",
    "code": "AAPL"
  });
});
//# sourceMappingURL=seed.js.map
