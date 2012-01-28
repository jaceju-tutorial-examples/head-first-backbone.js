var Countdown = {};

Countdown.Widget = Backbone.View.extend({
  _counting: false,
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
  intervalEvent: null,
  initialize: function () {
    this.hour.model = new Countdown.NumModel({
      value: 0
    });
    this.hour.model.max = 23;
    this.hour.model.name = 'hour';
    this.hour.view = new Countdown.NumView({
      el: '.hour',
      model: this.hour.model
    });
    this.minute.model = new Countdown.NumModel({
      value: 0
    });
    this.minute.model.name = 'minute';
    this.minute.model.parent = this.hour.model;
    this.minute.view = new Countdown.NumView({
      el: '.minute',
      model: this.minute.model
    });
    this.second.model = new Countdown.NumModel({
      value: 0
    });
    this.second.model.name = 'second';
    this.second.model.parent = this.minute.model;
    this.second.view = new Countdown.NumView({
      el: '.second',
      model: this.second.model
    });
  },
  events: {
    'click .start': 'start',
    'click .pause': 'pause',
    'click .reset': 'reset'
  },
  start: function () {
    this.pause();
    if (!this._counting) {
      var secondModel = this.second.model;
      secondModel.bind('timeup', this._timeup, this);
      this.intervalEvent = setInterval(function () {
        secondModel.countdown();
      }, 1000);
      this._counting = true;
    }
  },
  pause: function () {
    clearInterval(this.intervalEvent);
    this.second.model.unbind('timeup');
    this._counting = false;
  },
  reset: function () {
    this.pause();
    this.hour.model.reset();
    this.minute.model.reset();
    this.second.model.reset();
  },
  _timeup: function (target) {
    this.pause();
    this.timeup();
  },
  timeup: function () {
    console.log('timeup');
  }
});

Countdown.NumModel = Backbone.Model.extend({
  name: '',
  max: 59,
  parent: null,
  initialize: function () {
  },
  default: {
    value: 0
  },
  plus: function () {
    var value = this.get('value');
    if (value < this.max) {
      value += 1;
    } else {
      value = 0;
    }
    this.set({ value: value });
  },
  minus: function () {
    var value = this.get('value');
    if (value > 0) {
      value -= 1;
    } else {
      value = this.max;
    }
    this.set({ value: value });
  },
  reset: function () {
    this.set({ value: 0 });
  },
  countdown: function () {
    value = this.get('value');
    if (value > 0) {
      this.minus();
      return true;
    } else {
      if (!this.parent) {
        return false;
      }
      if (this.parent.countdown()) {
        this.minus();
        return true;
      } else {
        this.trigger('timeup', this);
        return false;
      }
    }
  }
});

Countdown.NumView = Backbone.View.extend({
  initialize: function () {
    // 注意要將 this 帶入第三個參數
    this.model.bind('change', this.render, this);
  },
  events: {
    'click .plus': 'plus',
    'click .minus': 'minus'
  },
  plus: function (e) {
    this.model.plus();
  },
  minus: function (e) {
    this.model.minus();
  },
  render: function (e) {
    // 這裡的 this 會變成上面 bind 方法的第三個參數
    $('.value', this.el).text(this._zeroFill(this.model.get('value'), 2));
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
  var countdownWidget = new Countdown.Widget({
    el: '.count-down'
  });
  countdownWidget.timeup = function () {
    alert('時間到！');
  };
});