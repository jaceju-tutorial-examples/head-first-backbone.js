var Box = Backbone.Model.extend({
  defaults: {
    width: 100,
    height: 100
  }
});

var box = new Box();

box.on("change", function () {
  // ...
  console.log("change");
}, box)
   .on("change:width", function () {
  // ...
  console.log("change:width");
}, box);

box.set("width", 400);

box.set("height", 300);
