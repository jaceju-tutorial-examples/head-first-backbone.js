var target = {};

_.extend(target, Backbone.Events, {
});

var init = function () {
  console.log('init');
}

target.on('init', init);
target.on('start', function () {
  console.log('start');
});

target.trigger('init start');

var context1 = {
  command: 'this is context1'
};
var context2 = {
  command: 'this is context2'
};
var execute = function () {
  console.log(this.command);
};
target.on('run execute', execute, context1);
target.on('run execute', execute, context2);
target.on('run execute', function () {
  console.log(this.command);
}, context2);
target.on('test', function () {});

// target.off('run execute', execute, context1);
target.off('run execute', execute);
// target.off('run execute');
// target.off();
target.trigger('run execute');
