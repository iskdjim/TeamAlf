function Index() {
  self = this;

  self.init = function() {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    getMostViewed();
  }
}