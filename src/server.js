var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddlewareBuilder = require('webpack-hot-middleware');

var routes = require('./routes/index');
var about = require('./routes/about');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (app.get('env') === 'development') {
  var chokidar = require('chokidar');
  var webpackConfig = require('../webpack.config.dev');
  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'index.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

  webpackHotMiddleware = webpackHotMiddlewareBuilder(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  });

  app.use(webpackHotMiddleware);

  var watcher = chokidar.watch(['./src/views'], { ignored: /\.swp/ });
  watcher.on('ready', function() {
    watcher.on('all', function(event, path) {
      webpackHotMiddleware.publish({ reload: true });
    });
  });

  app.use(express.static(path.join(__dirname, '../public')));
} else {
  app.use(express.static(path.join(__dirname, '../dist')));
}

app.use('/', routes);
app.use('/about', about);

hbs.localsAsTemplateData(app);
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('isActive', function(path, path2) {
  var active = '';
  if (path == path2) {
    active = 'class="active"';
  }
  return new hbs.SafeString(active);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;