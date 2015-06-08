var prog_data;

function Index() {
  self = this;

  self.init = function() {
  	hidder("start");
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  };

  self.getMostViewed = function() {
  	hidder("bubble");
  	$("#menu-toggle").trigger('click');
    getMostViewed();
  };
  
  self.getMostRemixed = function() {
  	hidder("bubble_v2");
  	$("#menu-toggle").trigger('click');
    getMostRemixed();
  };
}