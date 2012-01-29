(function() {
  var App,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = {};

  App.OptionsModel = (function(_super) {

    __extends(OptionsModel, _super);

    function OptionsModel() {
      OptionsModel.__super__.constructor.apply(this, arguments);
    }

    OptionsModel.prototype.initialize = function() {
      return this.set({
        'playSound': true,
        'playMusic': true
      });
    };

    return OptionsModel;

  })(Backbone.Model);

  App.ViewPort = (function(_super) {

    __extends(ViewPort, _super);

    function ViewPort() {
      ViewPort.__super__.constructor.apply(this, arguments);
    }

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

    return MenuView;

  })(App.ViewPort);

  App.OptionsView = (function(_super) {

    __extends(OptionsView, _super);

    function OptionsView() {
      this.setPlaySound = __bind(this.setPlaySound, this);
      this.setPlayMusic = __bind(this.setPlayMusic, this);
      OptionsView.__super__.constructor.apply(this, arguments);
    }

    OptionsView.prototype.initialize = function() {
      $("#play-music").prop('checked', this.model.get('playSound'));
      $("#play-sound").prop('checked', this.model.get('playMusic'));
      return $(":checkbox").iphoneStyle({
        onChange: function(target, checked) {
          return $(target).trigger('changeStatus');
        }
      });
    };

    OptionsView.prototype.events = {
      'changeStatus #play-music': 'setPlayMusic',
      'changeStatus #play-sound': 'setPlaySound'
    };

    OptionsView.prototype.setPlayMusic = function(e) {
      return this.model.set({
        'playMusic': $(e.target).prop('checked')
      });
    };

    OptionsView.prototype.setPlaySound = function(e) {
      return this.model.set({
        'playSound': $(e.target).prop('checked')
      });
    };

    return OptionsView;

  })(App.ViewPort);

  App.GameView = (function(_super) {

    __extends(GameView, _super);

    function GameView() {
      this.updateOptions = __bind(this.updateOptions, this);
      this.changeImage = __bind(this.changeImage, this);
      GameView.__super__.constructor.apply(this, arguments);
    }

    GameView.prototype.seq = 1;

    GameView.prototype.initialize = function() {
      this.image = $('#image-show');
      this.musicIcon = $('#music-icon');
      this.soundIcon = $('#sound-icon');
      this.model.bind('change', this.updateOptions);
      return setInterval(this.changeImage, 2000);
    };

    GameView.prototype.changeImage = function() {
      var src;
      src = "images/pic_" + this.seq + ".jpg";
      this.image.hide().attr('src', src).show();
      this.seq += 1;
      if (this.seq > 3) return this.seq = 1;
    };

    GameView.prototype.updateOptions = function() {
      if (this.model.get('playMusic')) {
        this.musicIcon.show();
      } else {
        this.musicIcon.hide();
      }
      if (this.model.get('playSound')) {
        return this.soundIcon.show();
      } else {
        return this.soundIcon.hide();
      }
    };

    return GameView;

  })(App.ViewPort);

  App.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.initialize = function() {
      this.options = new App.OptionsModel;
      this.views = $('.viewport');
      this.menuView = new App.MenuView({
        el: '#main-menu'
      });
      this.optionsView = new App.OptionsView({
        el: '#options',
        model: this.options
      });
      return this.gameView = new App.GameView({
        el: '#game',
        model: this.options
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
      this.views.hide();
      return this.menuView.render();
    };

    Router.prototype.setOptions = function() {
      this.views.hide();
      return this.optionsView.render();
    };

    Router.prototype.startGame = function() {
      this.views.hide();
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
