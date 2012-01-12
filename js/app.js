var Clock = {};

Clock.Model = Backbone.Model.extend({
  initialize: function () {
  },
  defaults: {
    'sec': 0
  },
  increase: function () {
    sec = this.get('sec');
    if (sec < 59) {
      sec += 1;
    } else {
      sec = 0;
    }
    this.set({'sec': sec});
  }
});

Clock.View = Backbone.View.extend({
  initialize: function () {
    this.model.bind('change', this.render, this); // 注意要將 this 帶入第三個參數
  },
  render: function (e) {
    $(this.el).text(this.model.get('sec')); // 這裡的 this 會變成上面 bind 方法的第三個參數
  }
});

Clock.App = function () {
  var model = new Clock.Model();
  var view = new Clock.View({
    'el': '.sec',
    'model': model
  });
  setInterval(function () {
    model.increase();
  }, 1000);
};

$(function () {
  return new Clock.App();
});