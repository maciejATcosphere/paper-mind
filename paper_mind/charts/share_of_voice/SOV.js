

var create_stage = function (data) {
    margin = {top: 20, right: 20, bottom: 30, left: 50};
    g_width = 960 - margin.left - margin.right;
    g_height = 300 - margin.top - margin.bottom;

    g_x = d3.time.scale().range([0, g_width]);
    g_y = d3.scale.linear().range([g_height, 0]);

    var xAxis = d3.svg.axis()
        .scale(g_x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(g_y)
        .orient("left");

    g_x.domain(d3.extent(data, function(d) { return d.date; }));
    g_y.domain([0, d3.max(data, function(d) { return d.value; })]);

    g_svg = d3.select("#chart").append("svg")
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
        .call(yAxis);
        // .append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 6)
        //     .attr("dy", ".71em")
        //     .style("text-anchor", "end")
        //     .text("Price ($)");
};

// var update_stage = function () {
// };

// var create_events = function () {
// };

// var delete_events = function () {
// };

var create_area = function (data, id) {
    g_x.domain(d3.extent(data, function(d) { return d.date; }));
    g_y.domain([0, d3.max(data, function(d) { return d.value; })]);

    var area = d3.svg.area()
        .x(function(d) { return g_x(d.date); })
        .y0(g_height)
        .y1(function(d) { return g_y(d.value); });

    g_svg.append("path")
        .datum(data)
        .attr('id', id)
        .attr("d", area);
};

var update_area = function (data, id) {
    g_x.domain(d3.extent(data, function(d) { return d.date; }));
    g_y.domain([0, d3.max(data, function(d) { return d.value; })]);

    var area = d3.svg.area()
        .x(function(d) { return g_x(d.date); })
        .y0(g_height)
        .y1(function(d) { return g_y(d.value); });

    g_svg.select("path#" + id)
        .datum(data)
        .transition()
            .duration(2500)
            .attr("d", area);
};

// main
g_parseDate = d3.time.format("%d-%b-%y").parse;
window.sov.forEach(function(d) {
    d.date = g_parseDate(d.date);
    d.value = +d.value;
});

window.empty.forEach(function(d) {
    d.date = g_parseDate(d.date);
    d.value = +d.value;
});

window.sov_removed_launches.forEach(function(d) {
    d.date = g_parseDate(d.date);
    d.value = +d.value;
});

window.social.forEach(function(d) {
    d.date = g_parseDate(d.date);
    d.value = +d.value;
});

create_stage(window.sov);
create_area(window.sov, 'sov');
create_area(window.empty, 'social');

window.setTimeout(function () {
    update_area(window.sov_removed_launches, 'sov');
}, 3000);

window.setTimeout(function () {
    update_area(window.social, 'social');
}, 6000);
