var App = window.App = (window.App || {});

App.PhotoListView = function(photoArray) {
  this.$el = $('<div></div>');
  this.$el.on("click", "a", this.showDetail.bind(this));
  
  Array.Photo.on("add", this.render.bind(this));
};

_.extend(App.PhotoListView.prototype, {
  
  render: function() {
    var $ul = $('<ul class="cat-images"></ul>');
    App.Photo.all.forEach(function(photo) {
      var $li = $("<li></li");
      var $a = $("<a></a>");
        $a.text(photo.get("title"));
        $a.attr("data-id", photo.get("id"));
        $a.attr("href", "#");
      var $img = $("<img class='cat-image'>");
        $img.attr("src", photo.get('url'));    
      $ul.append($li.html($a).append($img));
    });
    
    this.$el.html($ul);
    return this;
  }
  
  showDetail: function(event) {
    event.preventDefault();
    
    var $currentTarget = $(event.currentTarget);
    var photo = App.Photo.find(parseInt($currentTarget.attr("data-id")));
    App.showPhotoDetail(photo);
  }
});