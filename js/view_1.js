var Config = Backbone.Model.extend({
  defaults: {
    music: false
  }
});

var Switch = Backbone.View.extend({
  events: {
    'click #switch': 'toggleMusic'
  },
  toggleMusic: function (e) {
    this.model.set('music', $(e.target).prop('checked'));
  }
});

var Status = Backbone.View.extend({
  initialize: function () {
    this.model.on('change', this.render, this);
  },
  render: function () {
    var music = this.model.get('music');
    var status = music ? 'on' : 'off';
    $('#status', this.el)
      .removeClass('on off')
      .addClass(status)
      .text(status);
  }
});

$(function () {
  var config = new Config();
  var switchView = new Switch({
    el: '.input',
    model: config
  });
  var statusView = new Status({
    el: '.output',
    model: config
  });
});