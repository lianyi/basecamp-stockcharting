const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  watchedStocks = [];
  newStock = '';
  chartConfig;
  highchartsNG;
  stockService;

  /*@ngInject*/
  constructor($http, $scope, highchartsNG, stockService, socket) {
    this.$http = $http;
    this.socket = socket;
    this.highchartsNG = highchartsNG;
    this.stockService = stockService;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('stock');
    });
  }

  $onInit() {
    this.$http.get('/api/stocks').then(response => {
      this.watchedStocks = response.data;
      this.socket.syncUpdates('stock', this.watchedStocks, (event, item) => {
        if (event === 'created') {
          this.getStock(item.code);
        } else if (event === 'deleted') {
          this.deleteStock(item._id);
        }
      });
      this.watchedStocks.forEach(stock => this.getStock(stock.code));
    });

    this.chartConfig = {
      options: {
        chart: {
          zoomType: 'x'
        },
        rangeSelector: {
          enabled: true
        },
        navigator: {
          enabled: true
        }
      },
      series: [],
      title: {
        text: 'Stock Watcher App'
      },
      useHighStocks: true
    };
    //
    // if (false) this.chartConfig.series.push({
    //   id: 1,
    //   data: [
    //     [1147651200000, 23.15],
    //     [1147737600000, 23.01],
    //     [1147824000000, 22.73],
    //     [1147910400000, 22.83],
    //     [1147996800000, 22.56],
    //     [1148256000000, 22.88],
    //     [1148342400000, 22.79],
    //     [1148428800000, 23.50],
    //     [1148515200000, 23.74],
    //     [1148601600000, 23.72],
    //     [1148947200000, 23.15],
    //     [1149033600000, 22.65]
    //   ]
    // }, {
    //   id: 2,
    //   data: [
    //     [1147651200000, 25.15],
    //     [1147737600000, 25.01],
    //     [1147824000000, 25.73],
    //     [1147910400000, 25.83],
    //     [1147996800000, 25.56],
    //     [1148256000000, 25.88],
    //     [1148342400000, 25.79],
    //     [1148428800000, 25.50],
    //     [1148515200000, 26.74],
    //     [1148601600000, 26.72],
    //     [1148947200000, 26.15],
    //     [1149033600000, 26.65]
    //   ]

    // });

    this.highchartsNG.ready(function () {
      // init chart config, see lazyload example
    }, this);
  }


  getStock(name) {
    if (!name) return true;
    const serie = {name: name, data: []};
    this.stockService.get(name)
      .then(data => {
        serie.data = data.data.dataset.data.reverse().map(info => {
          return [
            (new Date(info[0])).getTime(),
            info[1]
          ];
        });
        this.chartConfig.series.push(serie);
      })
  }

  addStock() {
    if (this.newStock) {
      this.stockService.create(this.newStock).then(
        () => this.newStock = ''
      );
    }
  }

  deleteStock(stock) {
    if (!stock || !stock.code) return true;
    this.stockService.remove(stock.code);
    const object = this.chartConfig.series.filter(item => {
      //console.info(item, stock.code);
      return item.name.toUpperCase() === stock.code.toUpperCase();
    });
    if (object) {
      this.chartConfig.series.splice(this.chartConfig.series.indexOf(object), 1);
    }
  }
}

export default angular.module('stockchartsApp.main', [
  uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
