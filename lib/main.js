require(["jquery", "underscore", "backbone"], function($, _, backbone) {

var Config = Backbone.Model.extend({
  defaults: {
    music: false
  }
});

  $(function () {

var config = new Config();

$('#switch').on('click', function () {
  config.set('music', $(this).prop('checked'));
});

config.on('change', function () {
  var music = config.get('music');
  var status = music ? 'on' : 'off';
  $('#status')
    .removeClass('on off')
    .addClass(status)
    .text(status);
});

  });

});