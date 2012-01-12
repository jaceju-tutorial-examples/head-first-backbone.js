var Countdown = {};

Countdown.Widget = Backbone.Model.extend({
  model: null,
  view: null,
  initialize: function () {
    this.model = new Countdown.NumModel({
      value: 0
    });
    this.view = new Countdown.NumView({
      el: '.num',
      model: this.model
    });
  },
  start: function () {
    model = this.model;
    setInterval(function () {
      model.counting = true;
      model.countdown();
    }, 1000);
  }
});

Countdown.NumModel = Backbone.Model.extend({
  max: 59,
  counting: false,
  default: {
    value: 0
  },
  countdown: function () {
    if (this.counting) {
      value = this.get('value');
      if (value > 0) {
        value -= 1;
      } else {
        value = this.max;
      }
      this.set({ value: value });
    }
  }
});

Countdown.NumView = Backbone.View.extend({
  initialize: function () {
    this.model.bind('change', this.render, this);
    // 注意要將 this 帶入第三個參數
  },
  render: function (e) {
    $(this.el).text(this._zeroFill(this.model.get('value'), 2));
    // 這裡的 this 會變成上面 bind 方法的第三個參數
  },
  _zeroFill: function (num, len) {
    len -= num.toString().length;
    if (len > 0) {
      return new Array(len + (/\./.test(num) ? 2 : 1)).join('0') + num;
    }
    return num;
  }
});

$(function () {
  var countdownWidget = new Countdown.Widget();
  countdownWidget.start();
});