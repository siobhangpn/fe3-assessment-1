// prepares basic variables 

var margin = {
    top: 20,
    right: 30,
    bottom: 40,
    left: 30
};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// setting minimum and maximum value using the d3.extent

var x = d3.scale.linear()
    .range([0, width]);

// use to divide the vertical space into bands for each bar and specify the amount of padding between bars

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.2);

var xAxis = d3.svg.axis()
    .scale(x),
    .orient("bottom"),

    var yAxis = d3.svg.axis()
        .scale(y),
        .orient("left"),
        .tickSize(0),
        .tickPadding(6);

var svg = d3.select("body").append("svg"),
    .attr("width", width + margin.left + margin.right),
    .attr("height", height + margin.top + margin.bottom),
    .append("g"),
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function (error, data) {
    x.domain(d3.extent(data, function (d) {
        return d.speakers;
    })).nice();
    y.domain(data.map(function (d) {
        return d.languages;
    }));

    // making the bars 

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(Math.min(0, d.speakers));
        })
        .attr("y", function (d) {
            return y(d.languages);
        })
        .attr("width", function (d) {
            return Math.abs(x(d.speakers) - x(0));
        })
        .attr("height", y.rangeBand());

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis);
});

function type(d) {
    d.speakers = +d.speakers;
    return d;
}
