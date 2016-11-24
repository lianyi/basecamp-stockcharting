/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/stocks              ->  index
 * POST    /api/stocks              ->  create
 * GET     /api/stocks/:id          ->  show
 * PUT     /api/stocks/:id          ->  upsert
 * PATCH   /api/stocks/:id          ->  patch
 * DELETE  /api/stocks/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.showFromWeb = showFromWeb;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _stock = require('./stock.model');

var _stock2 = _interopRequireDefault(_stock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quandlapi = require('./quandlapi');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        return res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Stocks
function index(req, res) {
  return _stock2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Stock from the DB
function show(req, res) {
  return _stock2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Stock from the Web
function showFromWeb(req, res) {
  return quandlapi.getStockData(req.params.id).then(respondWithResult(res)).catch(handleError(res));
}
// Creates a new Stock in the DB
function create(req, res) {
  if (!req.body.name) {
    return res.status(400).json('name is a required parameter');
  }
  quandlapi.getStockMeta(req.body.name).then(function (data) {
    return _stock2.default.create(data).then(respondWithResult(res, 201)).catch(handleError(res));
  }).catch(handleError(res));
}

// Upserts the given Stock in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _stock2.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Stock in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _stock2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Stock from the DB
function destroy(req, res) {
  return _stock2.default.findOne({ code: req.params.id }).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=stock.controller.js.map
