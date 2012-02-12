(function() {
  var App,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App = {};

  App.ViewPort = (function(_super) {

    __extends(ViewPort, _super);

    function ViewPort() {
      ViewPort.__super__.constructor.apply(this, arguments);
    }

    ViewPort.prototype.events = {
      'click .home': 'hide'
    };

    ViewPort.prototype.hide = function() {
      return $(this.el).hide();
    };

    ViewPort.prototype.render = function() {
      return $(this.el).show();
    };

    return ViewPort;

  })(Backbone.View);

  App.MenuView = (function(_super) {

    __extends(MenuView, _super);

    function MenuView() {
      MenuView.__super__.constructor.apply(this, arguments);
    }

    MenuView.prototype.events = {
      'click a': 'hide'
    };

    return MenuView;

  })(App.ViewPort);

  App.OptionsView = (function(_super) {

    __extends(OptionsView, _super);

    function OptionsView() {
      OptionsView.__super__.constructor.apply(this, arguments);
    }

    OptionsView.prototype.initialize = function() {
      return $("input[type=checkbox]").iToggle({
        keepLabel: true,
        speed: 300
      });
    };

    return OptionsView;

  })(App.ViewPort);

  App.GameView = (function(_super) {

    __extends(GameView, _super);

    function GameView() {
      GameView.__super__.constructor.apply(this, arguments);
    }

    return GameView;

  })(App.ViewPort);

  App.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.initialize = function() {
      this.menuView = new App.MenuView({
        el: '#main-menu'
      });
      this.optionsView = new App.OptionsView({
        el: '#options'
      });
      return this.gameView = new App.GameView({
        el: '#game'
      });
    };

    Router.prototype.routes = {
      "": "mainMenu",
      "/options": "setOptions",
      "/start": "startGame",
      "/about": "about",
      "*error": "notFound"
    };

    Router.prototype.mainMenu = function() {
      return this.menuView.render();
    };

    Router.prototype.setOptions = function() {
      return this.optionsView.render();
    };

    Router.prototype.startGame = function() {
      return this.gameView.render();
    };

    Router.prototype.notFound = function() {
      return alert("404");
    };

    return Router;

  })(Backbone.Router);

  $(function() {
    var router;
    router = new App.Router();
    return Backbone.history.start();
  });

}).call(this);
