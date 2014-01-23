

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

    g_x.domain(d3.extent(data, function(d) { return d.x; }));
    g_y.domain([0, d3.max(data, function(d) { return d.y; })]);

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
        .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");
            // .text(yaxis_label);
};

// var update_stage = function () {
// };

// var create_events = function () {
// };

// var delete_events = function () {
// };

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

var shift_area = function (data, id, increment) {
    // transfom dates first
    var i, mlt = 24 * 60 * 60 * 1000;

    window.new_data = [];
    for (i = 0; i < data.length ; i++) {
        window.new_data.push(
            {
                'x': new Date(data[i].x.getTime() + increment * mlt),
                'y': data[i].y
            }
        );
    }

    // g_x.domain(d3.extent(window.new_data, function(d) { return d.x; }));
    // g_y.domain([0, d3.max(window.new_data, function(d) { return d.y; })]);

    var area = d3.svg.area()
        .x(function(d) { return g_x(d.x); })
        .y0(g_height)
        .y1(function(d) { return g_y(d.y); });

    g_svg.select("path#" + id)
        .datum(window.new_data)
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
g_parseDate = d3.time.format("%d-%b-%y").parse;
window.sov.forEach(function(d) {
    d.x = g_parseDate(d.x);
    d.y = +d.y;
});

window.empty.forEach(function(d) {
    d.x = g_parseDate(d.x);
    d.y = +d.y;
});

window.sov_removed_launches.forEach(function(d) {
    d.x = g_parseDate(d.x);
    d.y = +d.y;
});

window.social.forEach(function(d) {
    d.x = g_parseDate(d.x);
    d.y = +d.y;
});

create_stage(window.sov);
create_area(window.sov, 'sov');
create_area(window.empty, 'social');
// shift_area(window.social, 'social', 10);

// window.setTimeout(function () {
//     update_area(window.sov_removed_launches, 'sov');
// }, 6000);

// window.setTimeout(function () {
//     update_area(window.social, 'social');
// }, 12000);

update_area(window.sov_removed_launches, 'sov');
update_area(window.social, 'social');