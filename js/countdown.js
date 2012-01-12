var Countdown = {};

Countdown.Widget = Backbone.Model.extend({
  model: null,
  view: null,
  initialize: function () {
    this.model = new Countdown.NumModel({
      value: 0
    });
    this.view = new Countdown.SecondView({
      el: '.second',
      model: this.model
    });
  },
  start: function () {
    model = this.model;
    setInterval(function () {
      model.decrease();
    }, 1000);
  }
});

Countdown.NumModel = Backbone.Model.extend({
  default: {
    value: 0
  },
  decrease: function () {
    value = this.get('value');
    if (value > 0) {
      value -= 1;
    } else {
      value = 19;
    }
    this.set({ value: value });
  }
});

Countdown.SecondView = Backbone.View.extend({
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
    console.log(len);
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