// Set up the SVG container
var svg = d3.select("body")
            .append("svg")
            .attr("width", 900)
            .attr("height", 400);

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

// Create the scales
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Load the data from the CSV file
d3.csv("data\data2017.csv", function(error, data) {
  if (error) throw error;

  // Parse the data
  data.forEach(function(d) {
    d.SD = +d.SD;
    d.SMP = +d.SMP;
    d.SMA = +d.SMA;
    d.PT = +d.PT;
  });

  // Create the histogram bins
  var bins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(10))
    .value(function(d) { return d.SD; })
    (data);

  // Set up the colors
  var color = d3.scaleOrdinal()
    .domain(["SD", "SMP", "SMA", "PT"])
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]);

  // Create the bars
  svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.x0); })
    .attr("y", function(d) { return y(d.length); })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
    .attr("height", function(d) { return height - y(d.length); })
    .style("fill", function(d) { return color("SD"); });

  // Add axes
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));

  // Add title
  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", margin.top)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Distribusi Persentase Angka Partisipasi Sekolah Tahun 2017");

  // Add x-axis label
  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", height + margin.top + 20)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Persentase Partisipasi");

  // Add y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height / 2))
    .attr("y", margin.left - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text })
