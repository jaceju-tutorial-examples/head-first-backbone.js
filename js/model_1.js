var music = false;

(function ($) {
  $(function () {

$('#switch').on('click', function () {
  music = $(this).prop('checked');
  var status = music ? 'on' : 'off';
  $('#status')
    .removeClass('on off')
    .addClass(status)
    .text(status);
});

  });
})(jQuery);
