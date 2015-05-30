var children_prog;

function getMostViewed() {
	$.get('https://jsonp.afeld.me/?url=https://pocketcode.org/api/projects/mostViewed.json?limit=10&offset=0', function(data){
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


function getChildsForProject(id) {
	var project_id = id;
	$.get('https://jsonp.afeld.me/?url=https://web-test.catrob.at/pocketcode/api/programs/getRemixOf.json?id='+project_id+'&depth=5', function(data){
		if(data){
			//console.log(data);
			showData(data,"remixed-of");
		}else{
			return 0;
		}
	});
}


function showData(data, type){
	if(type == "most-viewed" || type == "most-remixed"){
		data = data.CatrobatProjects;
		//var children_tree = [];
		var children_bubble = [];
			
		
		$.each(data, function(i,val){
			//console.log(val)
			
			if(type == "most-viewed"){
				children_bubble.push({"name":val.ProjectName,"size":val.Views, "id":val.ProjectId});
			}else{
				children_bubble.push({"name":val.ProjectName,"size":val.RemixCount, "id":val.ProjectId});
			}
		});
	//console.log(children_bubble);
	//console.log("fu");
		//console.log(children);
		//var treeData = [{"name":"Catrobat Top Viewed", "parent": "null", "children": children_tree}];
		var bubbleData = {"name":"Catrobat Top Viewed", "children": children_bubble};
		generateBubble(bubbleData);	
		//generateTree(treeData);

	
	}else if(type = "remixed-of"){
		//data = data.CatrobatProjects;
		children_prog = [];
		console.log(data);
		children_prog.push({"key":data.id, "name":data.name, "title":data.name});
		$.each(data.childs, function(i,val){
		
			//if(val.childs.length() > 0){
			parent = data.id;
			children_prog.push({"key":val.id, "name":val.name, "title":val.name, "parent":parent});	
			if(val.childs != null){
				getRemixedChildren(val);
			}
			//}
			//if(val.RemixOf){
			//	children_prog.push({"key":val.ProjectId, "name":val.ProjectName, "title":val.ProjectName, "parent":val.RemixOf});	
			//}else{
			//	children_prog.push({"key":val.ProjectId, "name":val.ProjectName, "title":val.ProjectName});
			//}
			
		});

		//console.log(children_prog);
		prog_data = { "class": "go.TreeModel", "nodeDataArray": children_prog };

		initGo();
	
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

function generateBubble(bubbleData){
	var diameter = 460,
    format = d3.format(",d"),
    color = d3.scale.category20c();
   

	var bubble = d3.layout.pack()
	    .sort(null)
	    .size([$(window).width()-20, $(window).height()])
	
	var svg = d3.select("body #svg-bubble")
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
	      .on("click", function(d){ getChildsForProject(d.id)});
	
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
