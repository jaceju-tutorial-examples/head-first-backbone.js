var Note = Backbone.Model.extend({
  defaults: {
    id: null,
    title: '',
    content: ''
  },
  urlRoot: '/note'
});

// Create
// var note = new Note();

// note.on('create', function () {
//   console.log('create');
// });

// note.on('change', function () {
//   console.log('change: ' + this.id);
//   console.log(note.url());
// });

// note.on('sync', function () {
//   console.log('sync: ' + this.id); // 10
// });

// note.save({
//   title: 'Note 10',
//   content: 'This is note 10.',
// }, { wait: true });


// Fetch
// var note = new Note();
// note.id = 1;

// note.on('change', function () {
//   console.log('change: ' + this.id);
//   console.log(note.url());
//   console.log(this.toJSON());
// });

// note.on('sync', function () {
//   console.log('sync');
// });

// note.fetch({
//   success: function (model, response) {},
//   error: function (model, response) {}
// });

// Update
// var note = new Note({
//   'title': 'note 1',
//   'content': 'This is note 1.'
// });
// note.id = 1;

// note.on('change', function () {
//   console.log('change: ' + this.id);
//   console.log(note.url());
//   console.log(this.toJSON());
// });

// note.on('sync', function () {
//   console.log('sync');
// });

// note.save({
//   title: 'Note 10',
//   content: 'TEST',
// }, { wait: true });

// Destroy
// var note = new Note();
// note.id = 1;

// note.on('destroy', function () {
//   console.log('destroy');
// });

// note.on('change', function () {
//   console.log('change: ' + this.id);
//   console.log(note.url());
//   console.log(this.toJSON());
// });

// note.on('sync', function () {
//   console.log('sync: ' + this.id); // 10
// });

// note.destroy();