function getMostViewed() {
	$.get('https://jsonp.afeld.me/?url=https://pocketcode.org/api/projects/mostViewed.json?limit=10&offset=0', function(data){
		if(data){
			showData(data,"most-viewed");
		}else{
			return 0;
		}
	});
}

function showData(data, type){
	if(type == "most-viewed"){
		data = data.CatrobatProjects;
		var children_tree = [];
		var children_bubble = [];
		$.each(data, function(i,val){
			//console.log(val)
			children_tree.push({"name":val.ProjectName,"parent":"Catrobat Top Viewed"});
			children_bubble.push({"name":val.ProjectName,"size":val.Views, "id":val.ProjectId});
		});
		//console.log(children);
		var treeData = [{"name":"Catrobat Top Viewed", "parent": "null", "children": children_tree}];
		var bubbleData = {"name":"Catrobat Top Viewed", "children": children_bubble};
		generateBubble(bubbleData);	
		//generateTree(treeData);
	
	}
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
	      .text(function(d) { console.log(d.className); var name = d.className.ProjectId; return name + ": " + format(d.value); });
	
	  node.append("circle")
	      .attr("r", function(d) { return d.r; })
	      .style("fill", "#fff")
	      .on("click", function(d){ alert("id:"+d.id)});
	
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
