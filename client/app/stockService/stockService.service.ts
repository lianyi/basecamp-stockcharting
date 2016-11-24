'use strict';

const angular = require('angular');

/*@ngInject*/
export class stockService {

  $http;

  constructor($http) {
    this.$http = $http;
  }

  get(name) {
    return this.$http.get(`/api/stocks/${name}`);
  }

  create(name) {
    return this.$http.post('/api/stocks', {name: name});
  }

  remove(code) {
    this.$http.delete('/api/stocks/' + code);
  }

}

export default angular.module('stockchartsApp.stockService',[])
  .service('stockService', stockService)
  .name;
