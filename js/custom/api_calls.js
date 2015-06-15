var children_prog;
var apiurl = "https://jsonp.afeld.me/?url=https://web-test.catrob.at/pocketcode/api/projects/";
var state;

function getMostViewed() {
	$.get(apiurl+'mostViewed.json?limit=10&offset=0', function(data){
		if(data){
			showData(data,"most-viewed");
		}else{
			return 0;
		}
	});
}

function getMostRemixed() {
	$.get('https://jsonp.afeld.me/?url=https://web-test.catrob.at/pocketcode/api/programs/getMostRemixed.json?limit=10', function(data){
		if(data){
		
			showData(data,"most-remixed");
		}else{
			return 0;
		}
	});
}

function getMostDownloaded() {
	$.get('https://jsonp.afeld.me/?url=https://web-test.catrob.at/pocketcode/api/projects/mostDownloaded.json?limit=10&offset=0', function(data){
		if(data){
		
			showData(data,"most-downloaded");
		}else{
			return 0;
		}
	});
}

function getChildsForProject(id) {
	var project_id = id;
	$.getJSON('https://jsonp.afeld.me/?url=https://web-test.catrob.at/pocketcode/api/programs/getRemixOf.json?id='+project_id+'&depth=5', function(data){
		if(data){
			showData(data,"remixed-of");
		}else{
			return 0;
		}
	});
}

function getInfoForID(id){
	$.get(apiurl+'getInfoById.json?id='+id,function(data) {
		hidder("detail_page");
    	$('#detail_page h2.p_name').html(data.CatrobatProjects[0].ProjectName);
    	$('#detail_page .p_image').attr("src",'https://web-test.catrob.at/'+data.CatrobatProjects[0].ScreenshotSmall);
		$('#detail_page .p_desc').html(data.CatrobatProjects[0].Description);
		$('#detail_page .p_author').html(data.CatrobatProjects[0].Author);
		$('#detail_page .p_downloads').html(data.CatrobatProjects[0].Downloads);
	});
}

   
function loadChilds(actualElement, successFunction) {
	$.getJSON('https://jsonp.afeld.me/?url=https://web-test.catrob.at/pocketcode/api/programs/getRemixOf.json?id='+actualElement.id+'&depth=5', function(data){
    		var childs = [];
    		$.each(data.childs, function(i,val){
				var childs_flag = false;
				if(val.childs != null){
					//getRemixedChildren(val);
					childs_flag = true;
				}
				childs.push({"id":val.id, "desc":val.name, "hasChild":childs_flag});
    		});
    	data = {"result": childs};
		
    	successFunction(data);
	});
}




function showData(data, type){
	if(type == "most-viewed" || type == "most-remixed" || type == "most-downloaded"){
		data = data.CatrobatProjects;
		//var children_tree = [];
		var children_bubble = [];
			
		
		$.each(data, function(i,val){
			//console.log(val)
			
			if(type == "most-viewed"){
				children_bubble.push({"name":val.ProjectName,"size":val.Views, "id":val.ProjectId});
			}else if(type == "most-downloaded"){
				children_bubble.push({"name":val.ProjectName,"size":val.Downloads, "id":val.ProjectId});
			
			}else{

				children_bubble.push({"name":val.ProjectName,"size":val.RemixCount, "id":val.ProjectId});
			}
		});
	//console.log(children_bubble);
	//console.log("fu");
		//console.log(children);
		//var treeData = [{"name":"Catrobat Top Viewed", "parent": "null", "children": children_tree}];
		var bubbleData = {"name":"Catrobat Top Viewed", "children": children_bubble};
		console.log(bubbleData);
		
		var dest = "svg-bubble_v2";
		if(type == "most-viewed"){
			var dest = "svg-bubble";
		}

		if(type == "most-downloaded"){
			var dest = "svg-bubble_v3";
		}
		generateBubble(bubbleData,dest,type);
		//generateTree(treeData);

	
	}else if(type = "remixed-of"){

		children_prog;
		childs = [];
		
	
		$.each(data.childs, function(i,val){
		
			//if(val.childs.length() > 0){
				console.log(val);
			parent = data.id;
			//childs.push({"id":val.id, "desc":val.name, "hasChild":true});	
			var childs_flag = false;
			if(val.childs != null){
				//getRemixedChildren(val);
				childs_flag = true;
			}
			childs.push({"id":val.id, "desc":val.name, "hasChild":childs_flag});
			//}
			//if(val.RemixOf){
			//	children_prog.push({"key":val.ProjectId, "name":val.ProjectName, "title":val.ProjectName, "parent":val.RemixOf});	
			//}else{
			//	children_prog.push({"key":val.ProjectId, "name":val.ProjectName, "title":val.ProjectName});
			//}
			
		});
		children_prog = {"id":data.id, "desc":data.name, "children": childs};
		//console.log(children_prog);
		//prog_data = { "class": "go.TreeModel", "nodeDataArray": children_prog };
		//console.log(children_prog);
		//initGo();
		
		//data = {"id":"1","desc":"Executive office","children":[{"id":"2","desc":"Sales","hasChild":true},{"id":"3","desc":"Marketing","hasChild":true},{"id":"4","desc":"Development","hasChild":true}]};
		console.log(children_prog);
		console.log(data);
		orgChart.initTree({id: "#remixed", data: children_prog, modus: "diagonal", loadFunc: loadChilds});
		hidder("remixed");
	
	}
	
}

function getRemixedChildren(element){
	$.each(element.childs, function(i,val){
		parent = element.id;
		children_prog.push({"key":val.id, "name":val.name, "title":val.name, "parent":parent});	
		if(val.childs != null){	
			getRemixedChildren(val);
		}
			
	});	
}

function hidder(show){
	
	$.each($('.row .page-chart'), function(i,val){
		//console.log(val);
		if(show == $(val).attr('id')){
			$(val).show();
		}else{
			$(val).hide();
		}
	});
	
}
$(document).ready(function(){
	

$('.back-btn').click(function(){
	
	if(state == "viewed"){
		index.getMostViewed();
	}else if(state == "remixed"){
		index.getMostRemixed();
	}else if(state == "downloaded"){
		index.getMostDownloaded();
	}
	$("#menu-toggle").trigger('click');
});

});
function generateTree(treeData){
		
	// ************** Generate the tree diagram	 *****************
	var margin = {top: 40, right: 10, bottom: 20, left: 10},
		width = 460 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom;
		
	var i = 0;
	
	var tree = d3.layout.tree()
		.size([height, width]);
	
	var diagonal = d3.svg.diagonal()
		.projection(function(d) { return [d.x, d.y]; });
	
	var svg = d3.select("body #svg-tree")
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	root = treeData[0];
	  
	update(root);
	
	function update(source) {
	
	  // Compute the new tree layout.
	  var nodes = tree.nodes(root).reverse(),
		  links = tree.links(nodes);
	
	  // Normalize for fixed-depth.
	  nodes.forEach(function(d) { d.y = d.depth * 100; });
	
	  // Declare the nodes…
	  var node = svg.selectAll("g.node")
		  .data(nodes, function(d) { return d.id || (d.id = ++i); });
	
	  // Enter the nodes.
	  var nodeEnter = node.enter().append("g")
		  .attr("class", "node")
		  .attr("transform", function(d) { 
			  return "translate(" + d.x + "," + d.y + ")"; });
	
	  nodeEnter.append("circle")
		  .attr("r", 10)
		  .style("fill", "#fff");
	
	  nodeEnter.append("text")
		  .attr("y", function(d) { 
			  return d.children || d._children ? -18 : 18; })
		  .attr("dy", ".35em")
		  .attr("text-anchor", "middle")
		  .text(function(d) { return d.name; })
		  .style("fill-opacity", 1);
	
	  // Declare the links…
	  var link = svg.selectAll("path.link")
		  .data(links, function(d) { return d.target.id; });
	
	  // Enter the links.
	  link.enter().insert("path", "g")
		  .attr("class", "link")
		  .attr("d", diagonal);
	
	}
}

function generateBubble(bubbleData, dest, type_chart){
	var diameter = 460,
    format = d3.format(",d"),
    color = d3.scale.category20c();
   console.log(bubbleData);

	var bubble = d3.layout.pack()
	    .sort(null)
	    .size([$(window).width()-40, $(window).height()])
	
	var svg = d3.select("body #"+dest)
	    .attr("class", "bubble");
	
	  var node = svg.selectAll(".node")
	      .data(bubble.nodes(classes(bubbleData))
	      .filter(function(d) { return !d.children; }))
	    .enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	
	  node.append("title")
	      .text(function(d) { var name = d.className.ProjectId; return name + ": " + format(d.value); });
	
	  node.append("circle")
	      .attr("r", function(d) { return d.r; })
	      .style("fill", "#fff")
	      .on("click", function(d){ if(type_chart == "most-remixed"){getChildsForProject(d.id)}else{getInfoForID(d.id)}});
	
	  node.append("text")
	      .attr("dy", ".3em")
	      .style("text-anchor", "middle")
	      .text(function(d) { return d.className.substring(0, d.r / 3); });
	
	
	// Returns a flattened hierarchy containing all leaf nodes under the root.
	function classes(root) {
	  var classes = [];
	
	  function recurse(name, node) {
	
	    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
	    else classes.push({packageName: name, className: node.name, id: node.id, value: node.size});
	  }
	
	  recurse(null, root);
	  return {children: classes};
	}
	
d3.select(self.frameElement).style("height", diameter + "px");
	
}
