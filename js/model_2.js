var Config = Backbone.Model.extend({
  defaults: {
    music: false
  }
});

(function ($) {
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
})(jQuery);
