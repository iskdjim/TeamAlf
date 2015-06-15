var prog_data;

function Index() {
  self = this;

  self.init = function() {
  	hidder("start");
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    return 1;
  };

  self.getMostViewed = function() {
  	state = "viewed";
  	hidder("bubble");
  	$("#menu-toggle").trigger('click');
    getMostViewed();
  };
  
  self.getMostRemixed = function() {
  	hidder("bubble_v2");
  	state = "remixed";
  	$("#menu-toggle").trigger('click');
    getMostRemixed();
  };

  self.getMostDownloaded = function() {
  	hidder("downloaded");
  	state = "downloaded";
  	$("#menu-toggle").trigger('click');
    getMostDownloaded();
  };

}