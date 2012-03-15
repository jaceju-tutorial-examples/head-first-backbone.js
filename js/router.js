var App = {};
App.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'page/:page': 'page',
    'help': 'help',
    '*hello': 'notFound'
  },

  index: function () {
    alert('This is Home');
  },

  page: function (page) {
    alert('This is page ' + page);
  },

  help: function () {
    alert('This is help page');
  },

  notFound: function () {
    alert('404');
  }

});

$(function () {
  var router = new App.Router();
  Backbone.history.start();
});