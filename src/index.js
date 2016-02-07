import './js/menu';
import './js/scroll';
import './styles/main.scss';
require('font-awesome/css/font-awesome.css');

if (module.hot) {
  var webpackHotMiddlewareClient = require('webpack-hot-middleware/client');
  webpackHotMiddlewareClient.subscribe(function (message) {
    if (message.reload === true) {
      window.location.reload();
    }
  });

  module.hot.accept();
}
