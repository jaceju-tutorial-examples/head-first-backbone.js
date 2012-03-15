var Box = Backbone.Model.extend({
  defaults: {
    width: 100,
    height: 100
  },
  validate: function(attrs) {
    if (attrs.width < 1) {
      return "Width cannot be less than 0";
    }
    if (attrs.height < 1) {
      return "Height cannot be less than 0";
    }
  }
});

var box = new Box();
box.on("error", function(model, error) {
  alert(error);
});
box.set('width', -1);

// box.on("change", function () {
//   // ...
//   console.log("change");
// }, box)
//    .on("change:width", function () {
//   // ...
//   console.log("change:width");
// }, box);

box.set("width", 400);
box.set("height", 300);

if (box.isValid()) {
  alert('Box ('
    + box.get('width')
    + ', '
    + box.get('height')
    + ')');
}