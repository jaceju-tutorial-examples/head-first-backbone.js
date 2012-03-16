// ## Model
var Note = Backbone.Model.extend({
  defaults: {
    title: '',
    content: ''
  },
  url: 'model.php'
});

// ## Collection
var Notes = Backbone.Collection.extend({
  model: Note
});

// ## Prepare
//
// initialize data
var notes = new Notes([
  { id: 1, title: 'note 1', content: 'This is note 1.' },
  { id: 3, title: 'note 3', content: 'This is note 3.' },
  { id: 5, title: 'note 5', content: 'This is note 5.' },
  { id: 6, title: 'note 6', content: 'This is note 6.' },
  { id: 9, title: 'note 9', content: 'This is note 9.' }
]);

// ## Example
//
// length
console.log(notes.length);
console.log(notes.toJSON());

// get
var note3 = notes.get(3);
console.log(note3.id);
console.log(note3.toJSON());

// at
var note6 = notes.at(3);
console.log(note6.id);
console.log(note6.toJSON());

// remove
var note5 = notes.at(2);
console.log(note5.id);
notes.remove(note5);
notes.remove({ id: 5 });
console.log(notes.length);
console.log(notes.toJSON());

// add
note10 = new Note({
  id: 10,
  title: 'note 10',
  content: 'This is note 10.'
});

notes.add(note10);
console.log(notes.length);
console.log(notes.toJSON());

// customize `Backbon.sync`
Backbone.sync = function(method, model, options) {
  console.log(method + ": " + JSON.stringify(model));
  model.set('id', 10, { slient: true });
  options.success(model);
};

note10.save({
  title: 'note 10',
  content: 'This is note 10.'
}, {
  success: function (model, response) {
    notes.add(model);
    console.log(notes.length);
    console.log(notes.toJSON());
  }
});