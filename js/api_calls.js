
function getMostViewed() {
	jQuery.getJSON( "https://pocketcode.org/api/projects/mostViewed.json?limit=5&offset=0", function( data ) {
	 			 console.log(data);
	  
			});
			
			   $.get('https://pocketcode.org/api/projects/mostViewed.json?limit=5&offset=0' , function(data) {
               	console.log(data);
            }, 'json');
}
