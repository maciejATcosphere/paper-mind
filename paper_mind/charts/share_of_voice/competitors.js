

var create_stage_for_2 = function (
        id, data0, data1, yaxis_label, legend_label0, legend_label1) {
    margin = {top: 30, right: 100, bottom: 30, left: 100};
    g_width = 1060 - margin.left - margin.right;
    g_height = 300 - margin.top - margin.bottom;

    g_x = d3.time.scale().range([0, g_width]);
    // g_y = d3.scale.linear().range([g_height, 0]);
    g_y = d3.scale.linear().range([g_height, 0]);
    // g_y1 = d3.scale.linear().range([g_height, 0]);

    var xAxis = d3.svg.axis()
        .scale(g_x)
        .orient("bottom");

    var yAxisLeft = d3.svg.axis().scale(g_y)
        .orient("left").ticks(5);//.tickFormat(formatPercent);

    g_x.domain(d3.extent(data0, function(d) { return d.x; }));
    g_y.domain([0, d3.max(data0, function(d) { return d.y; })]);

    g_svg = d3.select('#' + id).append("svg")
        .attr("width", g_width + margin.left + margin.right)
        .attr("height", g_height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g_svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + g_height + ")")
        .call(xAxis);

    g_svg.append("g")
        .attr("class", "y axis")
        .call(yAxisLeft)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(yaxis_label || 'y-axis');

    // add legend
    var legend = g_svg.append("g")
      .attr("class", "legend")
      .attr("x", g_width - 65)
      .attr("y", 25)
      .attr("height", 100)
      .attr("width", 100);

    var g = legend.append('g');
    g.append("rect")
        .attr("x", 65)
        .attr("y", 0 * 25)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", 'steelblue');

    g.append("text")
        .attr("x", 80)
        .attr("y", 0 * 25 + 8)
        .attr("height", 30)
        .attr("width", 100)
        .style("fill", 'steelblue')
        .style('font-size', '16px')
        .text(legend_label0);

    var g = legend.append('g');
    g.append("rect")
        .attr("x", 65)
        .attr("y", 1 * 25)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", 'red')
        .style("fill-opacity", '0.5');

    g.append("text")
        .attr("x", 80)
        .attr("y", 1 * 25 + 8)
        .attr("height", 30)
        .attr("width", 100)
        .style("fill", 'red')
        .style('font-size', '16px')
        .style("fill-opacity", '0.5')
        .text(legend_label1);
};

var create_stage = function (id, data, yaxis_label) {
    margin = {top: 30, right: 100, bottom: 30, left: 100};
    g_width = 1060 - margin.left - margin.right;
    g_height = 300 - margin.top - margin.bottom;

    g_x = d3.time.scale().range([0, g_width]);
    g_y = d3.scale.linear().range([g_height, 0]);

    var xAxis = d3.svg.axis()
        .scale(g_x)
        .orient("bottom");

    var yAxisLeft = d3.svg.axis().scale(g_y)
        .orient("left").ticks(5);//.tickFormat(formatPercent);

    g_x.domain(d3.extent(data, function(d) { return d.x; }));
    g_y.domain([0, d3.max(data, function(d) { return d.y; })]);

    g_svg = d3.select('#' + id).append("svg")
        .attr("width", g_width + margin.left + margin.right)
        .attr("height", g_height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g_svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + g_height + ")")
        .call(xAxis);

    g_svg.append("g")
        .attr("class", "y axis")
        .call(yAxisLeft)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(yaxis_label || 'y-axis');

    // add legend
    var legend = g_svg.append("g")
      .attr("class", "legend")
      .attr("x", g_width - 65)
      .attr("y", 25)
      .attr("height", 100)
      .attr("width", 100);

    var g = legend.append('g');
    g.append("rect")
        .attr("x", 65)
        .attr("y", 0 * 25)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", 'steelblue');

    g.append("text")
        .attr("x", 80)
        .attr("y", 0 * 25 + 8)
        .attr("height", 30)
        .attr("width", 100)
        .style("fill", 'steelblue')
        .style('font-size', '16px')
        .text(yaxis_label);
};

var create_area = function (data, id) {
    if (!id) {
        g_x.domain(d3.extent(data, function(d) { return d.x; }));
        g_y.domain([0, d3.max(data, function(d) { return d.y; })]);
    }

    var area = d3.svg.area()
        .x(function(d) { return g_x(d.x); })
        .y0(g_height)
        .y1(function(d) { return g_y(d.y); });

    g_svg.append("path")
        .datum(data)
        .attr('id', id || 'series0')
        .attr("d", area);
};

