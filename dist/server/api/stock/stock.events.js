/**
 * Stock model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _stock = require('./stock.model');

var _stock2 = _interopRequireDefault(_stock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StockEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
StockEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _stock2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    StockEvents.emit(event + ':' + doc._id, doc);
    StockEvents.emit(event, doc);
  };
}

exports.default = StockEvents;
//# sourceMappingURL=stock.events.js.map
