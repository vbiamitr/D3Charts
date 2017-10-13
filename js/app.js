(function(){
	/*var matrix = [
		[11975,  5871, 8916, 2868],
		[ 1951, 10048, 2060, 6171],
		[ 8010, 16145, 8090, 8045],
		[ 1013,   990,  940, 6907]
    ];*/
    
    var dataStore = new DataStore();
    var matrix = dataStore.getData('column');
    
    addSvg();
    
    d3.select(window).on('resize', function(){
        setTimeout( addSvg, 100);
    }); 
	
       
    function addSvg(){
        var div = d3.select(".column");
        div.selectAll("*").remove();
        div.append("svg").classed('svg-content', true);
        createColumnChart();
    }
			
	// Drawing Bar Chart using D3
	function createColumnChart(){
		var data = matrix;
		var margin = {top: 20, right: 20, bottom: 40, left: 40};
		var columnPadding = 5;
        var div = d3.select(".column");
        var containerWidth = +div._groups[0][0].clientWidth;
        var containerHeight  = +div._groups[0][0].clientHeight; 			
		var width = containerWidth - margin.left - margin.right;
		var height = containerHeight - margin.top - margin.bottom;
		var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
        var y = d3.scaleLinear().rangeRound([height, 0]);

        x.domain(data.map(function(d){ return d.category; }));
        y.domain([0, d3.max(data, function(d){ return d.m1;})]);

        // Making svg width and height equal to container's width and height
        var svg = div.select("svg")                    
                    .attr("width", containerWidth)
                    .attr("height", containerHeight);
        
        
        /**
         * Adding a group element to transform the origin of the co-ordinate system. This group will act as parent to all other elements so that we don't have
         * to transform each and every component of chart separately and make calculations straightforward (Axes, DataLabel, Column)
         */         
        var rectGroup = svg.append("g")
                            .attr("width", width)
                            .attr("height", height)        
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Adding Tooltip
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Measure:</strong> <span style='color:red'>" + d.m1 + "</span>";
            });

        rectGroup.call(tip);

        // Adding Columns
		var rect = rectGroup.selectAll(".bar").data(data); 
        rect.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d, i){ return x(d.category);})
            .attr("y", function(d){ return y(d.m1)})
            .attr("width", x.bandwidth()) // x.bandwidth() eliminates the hassles of calculating the column width and the innerPadding manually.
            .attr("height", function(d){ return height - y(d.m1)})
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide);                    
        rect.exit().remove();
        
        // Adding DataLabels
        var textGroup = rectGroup.append("g"); 
        var text = textGroup.selectAll("text").data(data); 
        text.enter()
            .append("text")
            .text(function(d) {return d.m1;})
            .attr("text-anchor", "middle")
            .attr("x", function(d,i){ return x(d.category) + x.bandwidth()/2;})
            .attr("y", function(d){ return y(d.m1)});
        text.exit().remove();

        // Adding X-Axis        
        rectGroup.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", "translate(0" + "," + height  + ")")
            .call(d3.axisBottom(x));
        
        
        // Adding Y-Axis
        rectGroup.append("g")
            .attr("class", "axis y-axis")
            .call(d3.axisLeft(y));

        

    }
	
}())