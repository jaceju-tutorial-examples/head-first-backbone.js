(function() {
  var App,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App = {};

  App.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      "": "mainMenu",
      "/options": "setOptions",
      "/start": "startGame",
      "/about": "about",
      "*error": "notFound"
    };

    Router.prototype.mainMenu = function() {
      $('.viewport').hide();
      return $('#main-menu').show();
    };

    Router.prototype.setOptions = function() {
      $('.viewport').hide();
      return $('#options').show();
    };

    Router.prototype.startGame = function() {
      $('.viewport').hide();
      return $('#game').show();
    };

    Router.prototype.notFound = function() {
      return alert("404");
    };

    return Router;

  })(Backbone.Router);

  $(function() {
    var router;
    router = new App.Router();
    Backbone.history.start();
    return $("input[type=checkbox]").iToggle({
      keepLabel: true,
      speed: 300
    });
  });

}).call(this);
