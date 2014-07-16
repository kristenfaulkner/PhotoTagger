var App = window.App = (window.App || {})

App.Photo = function(options) {
  this.attributes = {};
  _.extend(this.attributes, options);
};

_.extend(App.Photo.prototype, {
  set: function(attr_name, val) {
    this.attributes[attr_name] = val;
  },

  get: function(attr_name) {
    return this.attributes[attr_name];
  },
  
  create: function(callback) {
    var attributes = this.attributes;
    $.ajax({
      url: 'api/photos',
      type: "POST",
      data: { photo: attributes },
      success: function(photo) {
        App.Photo.all.push(new Photo(photo));
        callback();
      }
    });
  },
  
  save: function(callback) {
    var attributes = this.attributes;
    if (attributes.id) {
      $.ajax({
        url: 'api/photos/' + attributes.id,
        type: "PUT",
        data: { photo: attributes },
        success: function(photo) {
          _.extend(attributes, photo);
          callback();
        }
      });
    } else {
      this.create(callback);
    }
  }
})

_.extend(App.Photo, {
  all: [],
  
  fetchByUserId: function(userId, callback) {
    $.ajax({
      url: 'api/users/' + userId + '/photos',
      type: "GET",
      success: function(photoArray) {
        photoArray.forEach(function(photo) {
           App.Photo.all.push(new App.Photo(photo));
        });
        callback();
      }
    });
  }
});
