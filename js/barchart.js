class Barchart {
  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {

    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 600,
      containerHeight: _config.containerHeight || 500,
      margin: _config.margin || { top: 20, right: 20, bottom: 200, left: 40 },
      reverseOrder: _config.reverseOrder || false,
      tooltipPadding: _config.tooltipPadding || 15
    };
    this.data = _data;



    this.initVis();
  }

  initVis() {
    let vis = this;


    vis.width =
      vis.config.containerWidth -
      vis.config.margin.left -
      vis.config.margin.right;
    vis.height =
      vis.config.containerHeight -
      vis.config.margin.top -
      vis.config.margin.bottom;

    // TO DO di sini: Initialize scales
    vis.xScale = d3.scaleBand().range([0, vis.width]).padding(0.4);

    vis.yScale = d3.scaleLinear().range([vis.height, 0]);

    // TO DO di sini: Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale).ticks(0).tickSizeOuter(0);

    vis.yAxis = d3.axisLeft(vis.yScale).tickSizeOuter(0);

    // Define size of SVG drawing area
    vis.svg = d3
      .select(vis.config.parentElement)
      .append("svg")
      .attr("width", vis.config.containerWidth)
      .attr("height", vis.config.containerHeight);

    // Append group element that will contain our actual chart
    // and position it according to the given margin config
    vis.chart = vis.svg
      .append("g")
      .attr(
        "transform",
        `translate(${vis.config.margin.left},${vis.config.margin.top})`
      );

    // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0,${vis.height})`);

    // Append and move a title for the x-axis. We don't have to move it to the bototm of the
    // chart since we append it to the x-axis group.
    vis.xAxisTitle = vis.xAxisG
      .append("text")
      .attr("y", 20)
      .attr("x", vis.width / 2)
      .attr("dy", "2.5em")
      .attr("fill", "black")
      .attr("class", "axis-label x")
      .style("text-anchor", "middle");

    // Append y-axis group
    vis.yAxisG = vis.chart.append("g").attr("class", "axis y-axis");

// Append chart title
vis.chartTitle = vis.svg
  .append("text")
  .attr("class", "chart-title")
  .attr("x", vis.config.containerWidth / 2)
  .attr("y", vis.config.margin.top)
  .attr("dy", "-0.5em")
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .text("Angka rata-rata Partisipasi Sekolah dari Tahun 2011-2017 Di Indonesia");


  }


  updateVis() {
    let vis = this;

    // TO DO di sini: Specificy x- and y-accessor functions
    vis.xValue = (d) => d.key;
    vis.yValue = (d) => d.value;


    // TO DO di sini: Set the scale input domains
    vis.xScale
      .domain(vis.data.map((d) => d.key))
      .range([0, vis.width])
      .paddingInner(0.1);
    vis.yScale
      .domain([0, d3.max(vis.data, (d) => vis.yValue(d))])

      .range([vis.height, 0]);

    // Update the x-axis and rotate the labels
    vis.xAxisG
      .call(vis.xAxis)
      .selectAll(".tick text")
      .attr("transform", "rotate(-65)")
      .attr("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "-0.5em");

    vis.renderVis();

  }


  renderVis() {
    // Fill out renderVis
    let vis = this;



    let bars = vis.chart.selectAll('.bar')
        .data(vis.data);


    let barEnter = bars.enter()
      .append('rect')
      .attr('class', 'bar');

barEnter.merge(bars)
  .attr("x", (d) => vis.xScale(vis.xValue(d)))
  .attr("width", vis.xScale.bandwidth())
  .transition()
  .duration(500)
  .delay((d, i) => i * 5)
  .attr("y", (d) => vis.yScale(vis.yValue(d)))
  .attr("height", (d) => vis.height - vis.yScale(vis.yValue(d)))
  .style("fill", (d) => {
    const colorScale = d3
      .scaleLinear()
      .domain([d3.min(vis.data, (d) => vis.yValue(d)), d3.max(vis.data, (d) => vis.yValue(d))])
      .range(["#7dd3fc", "#0369a1"]);

    return colorScale(vis.yValue(d)); // Set the color based on the data value
  });



     

    bars.exit().remove();

    // Update the axes because the underlying scales might have changed
    vis.xAxisG.call(vis.xAxis);
    vis.yAxisG.call(vis.yAxis);
  }
}


