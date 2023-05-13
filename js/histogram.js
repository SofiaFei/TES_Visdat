// set the dimensions and margins of the graph
const margin = {top: 60, right: 20, bottom: 50, left: 40};
const width = 450 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
d3.select("#viz_container").text("kakakk");

// parse the Data
d3.csv("data/Angka Partisipasi Sekolah 2017.csv")
.then(function(data){

// X scale and Axis
const xScale = d3.scaleLinear()
  .domain([0,100])
  .range([0, width]);
svg
  .append('g')
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale).tickSize(0).tickPadding(8));

// Y scale and Axis
const yScale = d3.scaleLinear()
    .range([height, 0]);

const yAxis = svg.append('g')

// set horizontal grid line
const GridLine = () => d3.axisLeft().scale(yScale);
svg
  .append("g")
    .attr("class", "grid")
  .call(GridLine()
    .tickSize(-width,0,0)
    .tickFormat("")
    .ticks(10)
);

// create a tooltip
const tooltip = d3.select("body")
  .append("div")
    .attr("class", "tooltip");

// tooltip events
const mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "#EF4A60")
      .style("opacity", .5)
};
const mousemove = function(event,d) {
    tooltip
    .html(`<b>Number of people</b>: ${d.length}`)
      .style("top", event.pageY - 10 + "px")
      .style("left", event.pageX + 10 + "px")
};
const mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
};

// set the parameters for the histogram
const histogram = d3.bin()
  .value(d => d.poc_age)
  .domain(xScale.domain())
  .thresholds(xScale.ticks(50));

// prepare data for bars
const bins = histogram(data)

// Scale the range of the data in the y domain
yScale.domain([0, 20]);

// add the y Axis
yAxis
  .call(d3.axisLeft(yScale).tickSize(0).tickPadding(4))
  .call(d => d.select(".domain").remove());

// append the bar rectangles to the svg element
svg
  .selectAll("rect")
    .data(bins)
  .join("rect")
    .attr("class", "bar")
    .attr("x", 1)
    .attr("transform", d => `translate(${xScale(d.x0)}, ${yScale(d.length)})`)
    .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
    .attr("height", d => height - yScale(d.length))
    .style("fill", "#0072BC")
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave);

// set title
svg
  .append("text")
    .attr("class", "chart-title")
    .attr("x", -(margin.left)*0.4)
    .attr("y", -(margin.top)/1.5)
    .attr("text-anchor", "start")
  .text("Age distribution | 2020")

// set X axis label
svg
  .append("text")
    .attr("class", "chart-label")
    .attr("x", width/2)
    .attr("y", height+margin.bottom/1.7)
    .attr("text-anchor", "middle")
  .text("Age");

// set Y axis label
svg
  .append("text")
    .attr("class", "chart-label")
    .attr("x", -(margin.left)*0.4)
    .attr("y", -(margin.top/5))
    .attr("text-anchor", "start")
  .text("Number of people")

// set source
svg
  .append("text")
    .attr("class", "chart-source")
    .attr("x", -(margin.left)*0.4)
    .attr("y", height + margin.bottom*0.7)
    .attr("text-anchor", "start")
  .text("Source: UNHCR")

// set copyright
svg
  .append("text")
    .attr("class", "copyright")
    .attr("x", -(margin.left)*0.4)
    .attr("y", height + margin.bottom*0.9)
    .attr("text-anchor", "start")
  .text("©UNHCR, The UN Refugee Agency")
})