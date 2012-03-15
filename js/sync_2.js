Backbone.sync = function(method, model, options) {
  var resp;
  switch (method) {
    case "create": /* ... */ break;
    case "read":   /* ... */ break;
    case "update": /* ... */ break;
    case "delete": /* ... */ break;
  }
  if (resp) {
    options.success(model, resp);
  } else {
    options.error((model, resp);
  }
};

var Note = Backbone.Model.extend({
  defaults: {
    id: null,
    title: '',
    content: ''
  }
});

var Notes = Backbone.Collection.extend({
  model: Note,
  url: '/note'
});

var notes = new Notes();

// Create
notes.on('add', function (model) {
  console.log('add: ' + model.id);
});

notes.on('change', function (model) {
  console.log('change: ' + model.id);
});

notes.on('sync', function () {
  console.log('sync');
});

var note = notes.create({
  'title': 'note 11',
  'content': 'This is note 11.'
}, { wait: true });
// POST http://backbone.sync/note
// 觸發 add 事件

// Load
// notes.on('add', function (model) {
//   console.log('add: ' + model.id);
// });

// notes.on('change', function (model) {
//   console.log('change: ' + model.id);
// });

// notes.on('sync', function () {
//   console.log('sync');
// });

// notes.fetch({ add: true });
// // GET http://backbone.sync/note

// // { add: true } 時，可以在每載入一筆資料時，觸發 add 事件。

// Update
// notes.on('remove', function (model) {
//   console.log('remove model ' + model.id);
// });

// notes.fetch({
//   success: function () {

// var note = notes.at(1);
// note.on('remove', function () {
//   console.log('remove : ' + this.id);
// });
// notes.remove(note);

//   }
// });
