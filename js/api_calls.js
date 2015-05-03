
function getMostViewed() {
	$.get('https://jsonp.afeld.me/?url=https://pocketcode.org/api/projects/mostViewed.json?limit=5&offset=0', function(data){
		console.log(data);
	});
}
