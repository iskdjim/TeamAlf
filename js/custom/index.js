var prog_data;

function Index() {
  self = this;

  self.init = function() {
  	hidder("none");
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  };

  self.getMostViewed = function() {
  	hidder("bubble");
    getMostViewed();
  };
  
  self.getMostRemixed = function() {
  	hidder("bubble");
    getMostRemixed();
  };
}