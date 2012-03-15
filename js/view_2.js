var Note = Backbone.Model.extend({
  defaults: {
    title: '',
    content: ''
  },
});

var Notes = Backbone.Collection.extend({
  model: Note
});

var NotesView = Backbone.View.extend({
  initialize: function () {
    this.render();
  },
  render: function () {
    this.collection.forEach(function (model) {
      var noteView = new NoteView({
        model: model,
      });
      this.$el.append(noteView.render().el);
    }, this);
  }
});

var NoteView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#note-template').html()),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

$(function () {

var notes = new Notes([
  { id: 1, title: 'note 1', content: 'This is note 1.' },
  { id: 3, title: 'note 3', content: 'This is note 3.' },
  { id: 5, title: 'note 5', content: 'This is note 5.' },
  { id: 6, title: 'note 6', content: 'This is note 6.' },
  { id: 9, title: 'note 9', content: 'This is note 9.' }
]);

var notesView = new NotesView({
  collection: notes,
  el: '#notes'
});

});