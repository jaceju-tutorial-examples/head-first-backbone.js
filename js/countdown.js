var Countdown = {};

Countdown.Widget = Backbone.View.extend({
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
    this.hour.model.max = 3;
    this.hour.model.name = 'hour';
    this.hour.view = new Countdown.NumView({
      el: '.hour',
      model: this.hour.model
    });
    this.minute.model = new Countdown.NumModel({
      value: 0
    });
    this.minute.model.name = 'minute';
    this.minute.model.setParent(this.hour.model);
    this.minute.view = new Countdown.NumView({
      el: '.minute',
      model: this.minute.model
    });
    this.second.model = new Countdown.NumModel({
      value: 0
    });
    this.second.model.name = 'second';
    this.second.model.setParent(this.minute.model);
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
    // 時間到
    this.bind('timeup', this.timeup, this);
    // 秒數倒數完成檢查
    var hourModel = this.hour.model;
    var minuteModel = this.minute.model;
    var secondModel = this.second.model;
    hourModel.start();
    minuteModel.start();
    secondModel.start();
    this.intervalEvent = setInterval(function () {
      secondModel.countdown();
    }, 1000);
  },
  pause: function () {
    this.second.model._counting = false;
    clearInterval(this.intervalEvent);
  },
  reset: function () {
    this.hour.model.reset();
    this.minute.model.reset();
    this.second.model.reset();
    clearInterval(this.intervalEvent);
  },
  timeup: function (target) {
    console.log('timeup');
  }
});

Countdown.NumModel = Backbone.Model.extend({
  name: '',
  max: 9,
  _parent: null,
  _counting: false,
  initialize: function () {
    this.bind('timeup', this.timeup, this);
  },
  setParent: function (parent) {
    this._parent = parent;
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
    this._counting = false;
    this.set({ value: 0 });
  },
  start: function () {
    this._counting = true;
  },
  stop: function () {
    this._counting = false;
  },
  countdown: function () {
    if (this._counting) {
      value = this.get('value');
      if (value > 0) {
        this.minus();
      } else {
        this.stop();
        this.trigger('timeup', this);
      }
    }
  },
  timeup: function () {
    console.log(this.name + ': timeup');
    if (!this._parent) {
      return;
    }
    var parentValue = this._parent.get('value');
    console.log(parentValue);
    if (parentValue > 0) {
      this._parent.countdown();
    } else {
      this._parent.trigger('timeup', this._parent);
    }
    this.start();
    this.minus();
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
});