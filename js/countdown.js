var Countdown = {};

Countdown.Widget = Backbone.Model.extend({
  hour: {
    model: null,
    view: null
  },
  minute: {
    model: null,
    view: null
  },
  second: {
    model: null,
    view: null
  },
  initialize: function () {
    this.hour.model = new Countdown.NumModel({
      value: 0
    });
    this.hour.model.max = 12;
    this.hour.view = new Countdown.NumView({
      el: '.hour',
      model: this.hour.model
    });
    this.minute.model = new Countdown.NumModel({
      value: 0
    });
    this.minute.view = new Countdown.NumView({
      el: '.minute',
      model: this.minute.model
    });
    this.second.model = new Countdown.NumModel({
      value: 10
    });
    this.second.model.bind('timeup', this.timeup, this);
    this.second.view = new Countdown.NumView({
      el: '.second',
      model: this.second.model
    });
  },
  start: function () {
    model = this.second.model;
    model.counting = true;
    setInterval(function () {
      model.countdown();
    }, 1000);
  },
  timeup: function (target) {
    if (target === this.second.model) {
      console.log('second');
    }
    console.log('timeup');
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
        if (0 === value) {
          this.counting = false;  // 停止倒數
          this.trigger('timeup', this); // 時間到
        }
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