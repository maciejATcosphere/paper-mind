

var create_stage = function (id, data, legend_labels) {
    margin = {top: 40, right: 20, bottom: 30, left: 50};
    g_width = 960 - margin.left - margin.right;
    g_height = 300 - margin.top - margin.bottom;

    // TODO: only one change here
    g_x = d3.scale.linear().range([0, g_width]);

    g_y = d3.scale.linear().range([g_height, 0]);

    var xAxis = d3.svg.axis()
        .scale(g_x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(g_y)
        .orient("left");

    g_x.domain(d3.extent(data, function(d) { return d.x; }));
    g_y.domain([0, d3.max(data, function(d) { return d.y; })]);

    g_svg = d3.select("#" + id).append("svg")
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
        .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Probability of observing particular VoM");

    // add legend
    var legend = g_svg.append("g")
      .attr("class", "legend")
      .attr("x", g_width - 65)
      .attr("y", 25)
      .attr("height", 100)
      .attr("width", 100);


    for (var i = 0; i < legend_labels.length ; i++) {
        var legend_label = legend_labels[i];
        var g = legend.append('g');

        g.append("rect")
            .attr("x", g_width - 395)
            .attr("y", i * 25 - 15)
            .attr("width", 10)
            .attr("height", 10)
            .attr("class", legend_label.class + '-rect');

        g.append("text")
            .attr("x", g_width - 380)
            .attr("y", i * 25 + 8 - 15)
            .attr("height", 30)
            .attr("width", 100)
            .attr("class", legend_label.class + '-text')
            .text(legend_label.label);
    }
};

var create_area = function (data, id) {
    g_x.domain(d3.extent(data, function(d) { return d.x; }));
    g_y.domain([0, d3.max(data, function(d) { return d.y; })]);

    var area = d3.svg.area()
        .x(function(d) { return g_x(d.x); })
        .y0(g_height)
        .y1(function(d) { return g_y(d.y); });

    g_svg.append("path")
        .datum(data)
        .attr('id', id)
        .attr("d", area);
};

var update_area = function (data, id) {
    g_x.domain(d3.extent(data, function(d) { return d.x; }));
    g_y.domain([0, d3.max(data, function(d) { return d.y; })]);

    var area = d3.svg.area()
        .x(function(d) { return g_x(d.x); })
        .y0(g_height)
        .y1(function(d) { return g_y(d.y); });

    g_svg.select("path#" + id)
        .datum(data)
        .transition()
            .duration(2500)
            .attr("d", area);
};

// main
var legend_labels = [
    {
        'label': "Dell's Volume of Mentions (empirical distribution)",
        'class': 'series0-legend'
    },
    {
        'label': "HP's Volume of Mentions (empirical distribution)",
        'class': 'series1-legend'
    }
];
create_stage('chart-0', window.dist_dell, legend_labels);
create_area(window.dist_dell, 'series0');
create_area(window.dist_hp, 'series1');

var legend_labels = [
    {
        'label': "Apple's Volume of Mentions (empirical distribution)",
        'class': 'series0-legend'
    },
];
create_stage('chart-1', window.dist_apple, legend_labels);
create_area(window.dist_apple, 'series0');


var legend_labels = [
    {
        'label': "Samsung's Volume of Mentions (empirical distribution)",
        'class': 'series1-legend'
    },
];
create_stage('chart-2', window.dist_samsung, legend_labels);
create_area(window.dist_samsung, 'series1');
