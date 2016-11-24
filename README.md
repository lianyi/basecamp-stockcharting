# Chart the stock market

This app was designed to show a graph displaying the recent trend lines for each added stock.

* add new stocks by their symbol name.

* remove stocks.

* see changes in real-time when any other user adds or removes a stock. 

      experiment note: using the service instead direct $http avoid the issue where delete command will send multiple times. 

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.


## important

Don't forget to set the ENV for 

  QUANDL_API_KEY and MONGODB_URI


##deploy 

    git subtree split --prefix dist master
    git push heroku 14f74ccb037126f49f97497e844b9b243a10f7a9:master  --force
