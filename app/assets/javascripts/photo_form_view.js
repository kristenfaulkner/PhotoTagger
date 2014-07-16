var App = window.App = (window.App || {});

App.PhotoFormView = function() {
  this.$el = $('<div></div>');
  this.$el.on("submit", "form", this.submit.bind(this));
};

_.extend(App.PhotoFormView.prototype, {
  render: function () {
    this.$el.html(JST["photo_form"]());
    return this;
  }
  
  submit: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    var photo = new App.Photo(data.photo);
    photo.create(function(photo) {
      console.log("Photo saved!");
    });
  }
);

