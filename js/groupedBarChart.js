const margin = { top: 25, right: 40, bottom: 45, left: 70 },
  mini_margin = { top: 0, right: 30, bottom: 0, left: 40 },
  barWidth = 140,
  legendWidth = 100,
  miniChartHeight = 60;
let svg, width, height;

function createGroupBarchartWithScrolling(
  elementId,
  data,
  xAxisLabel,
  yAxisLabel,
  dynamicYTicks,
  showTitles,
  allowInteractions,
  callback
) {
  createSvgElement(elementId).then(() => {
    const keys = Object.keys(data[0]).filter(
      (e) => e.toLowerCase() !== "tahun" && e.indexOf("hoverText") === -1
    );
    const groupKey = "tahun";
    let numBar = Math.round(width / barWidth);
    let legendY = 15;
    const isScrollable = barWidth * data.length * keys.length > width;
    if (isScrollable) {
      height = height - margin.bottom - margin.top - miniChartHeight;
      legendY = 0;
    } else {
      legendY = 15;
      height = height - miniChartHeight - 10;
    }
    const numBars = numBar / keys.length;
    let d1;
    if (dynamicYTicks) {
      d1 = data.slice(0, numBars);
    } else {
      d1 = data;
    }

    let x0 = d3
      .scaleBand()
      .domain(data.slice(0, numBars).map((d) => d[groupKey]))
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.3)
      .paddingOuter(0.25);
    let x1 = d3
      .scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.01);
    let y = d3
      .scaleLinear()
      .domain([0, d3.max(d1, (d) => d3.max(keys, (key) => d[key]))])
      .nice()
      .range([height, margin.top]);
    let xAxis = (g) =>
      g
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3
            .axisBottom(x0)
            .tickFormat((i) => i)
            .tickSizeOuter(0)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "currentColor")
            .attr("class", "x-axisLabel")
            .text(xAxisLabel)
        );
    let yAxis = (g) =>
      g
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y).ticks(10))
        .call((g) =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yAxisLabel)
        );
    const color = d3
      .scaleOrdinal()
      .domain(keys)
      .range(d3.schemeSpectral[keys.length]);

    svg
      .append("g")
      .attr("class", "groupedBars")
      .selectAll("g")
      .data(data.slice(0, numBars))
      .join("g")
      .attr("transform", (d) => "translate(" + x0(d[groupKey]) + ",0)")
      .selectAll("rect")
      .data((d) =>
        keys.map((key) => ({
          key,
          value: d[key],
          hoverText: d["hoverTextOf" + key],
        }))
      )
      .join("rect")
      .attr("x", (d) => x1(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", (d) => color(d.key))
      .append("title")
      .text((d) => (showTitles ? d.hoverText : ""));
    svg.append("g").attr("class", "x-axis").call(xAxis);
    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg
      .append("g")
      .attr("class", "rectTextData")
      .selectAll("g")
      .data(data.slice(0, numBars))
      .join("g")
      .attr("transform", (d) => "translate(" + x0(d[groupKey]) + ",0)")
      .selectAll(".chartText2")
      .data((d) => keys.map((key) => ({ key, value: d[key] })))
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("class", "chartText2")
      .attr("x", (d) => x1(d.key) + x1.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 3)
      .text((d) => d.value);

    let legend = d3
      .legendColor()
      .shapeWidth(legendWidth)
      .shapePadding(10)
      .orient("horizontal")
      .scale(color)
      .labelWrap(height / 4 - 10);
    svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          margin.left +
          "" +
          (+svg.attr("height") - miniChartHeight - 5) +
          ")"
      )
      .call(legend);

    svg
      .append("circle")
      .attr("cx", 1560)
      .attr("cy", 7)
      .attr("r", 6)
      .style("fill", "#D7191C");
    svg
      .append("text")
      .attr("x", 1580)
      .attr("y", 7)
      .text("SD")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("circle")
      .attr("cx", 1560)
      .attr("cy", 27)
      .attr("r", 6)
      .style("fill", "#FDAE61");
    svg
      .append("text")
      .attr("x", 1580)
      .attr("y", 27)
      .text("SMP")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("circle")
      .attr("cx", 1560)
      .attr("cy", 47)
      .attr("r", 6)
      .style("fill", "#ABDDA4");
    svg
      .append("text")
      .attr("x", 1580)
      .attr("y", 47)
      .text("SMA")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("circle")
      .attr("cx", 1560)
      .attr("cy", 67)
      .attr("r", 6)
      .style("fill", "#2B83BA");

    svg
      .append("text")
      .attr("x", 1580)
      .attr("y", 67)
      .text("PT")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");

    if (isScrollable) {
      var mini_x0 = d3
        .scaleBand()    
        .domain(data.map((d) => d[groupKey]))
        .rangeRound([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.3);
      var mini_x1 = d3
        .scaleBand()
        .domain(keys)
        .rangeRound([0, mini_x0.bandwidth()])
        .padding(0);
      var mini_y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d3.max(keys, (key) => d[key]))])
        .nice()
        .range([miniChartHeight, 0]);

      var miniChart = svg
        .append("g")
        .attr(
          "transform",
          "translate(0," + (+svg.attr("height") - miniChartHeight - 20) + ")"
        );

      miniChart
        .append("g")
        .attr("transform", "translate(0," + miniChartHeight + ")")
        .call(d3.axisBottom(mini_x0));
      miniChart
        .append("g")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", (d) => "translate(" + mini_x0(d[groupKey]) + ",0)")
        .selectAll("rect")
        .data((d) => keys.map((key) => ({ key, value: d[key] })))
        .join("rect")
        .attr("x", (d) => mini_x1(d.key))
        .attr("y", (d) => mini_y(d.value))
        .attr("width", mini_x1.bandwidth())
        .attr("height", (d) => mini_y(0) - mini_y(d.value))
        .attr("fill", (d) => color(d.key));

      var displayed = d3
        .scaleQuantize()
        .domain([0, width])
        .range(d3.range(data.length));
      miniChart
        .append("rect")
        .attr("class", "chartScrollBar mover")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", miniChartHeight)
        .attr("width", Math.round(parseFloat(numBars * width) / data.length))
        .attr("pointer-events", "all")
        .attr("cursor", "ew-resize")
        .call(d3.drag().on("drag", scrollData));

      function scrollData() {
        var x = parseInt(d3.select(this).attr("x"), 10),
          nx = x + d3.event.dx,
          w = parseInt(d3.select(this).attr("width"), 10),
          f,
          nf,
          new_data,
          rects;

        if (nx < 0 || nx + w > width) return;
        d3.select(this).attr("x", nx);
        f = displayed(x);
        nf = displayed(nx);

        if (f === nf) return;
        new_data = data.slice(nf, nf + numBars);
        let d11;
        if (dynamicYTicks) {
          d11 = new_data;
        } else {
          d11 = data;
        }
        x0.domain(new_data.map((d) => d[groupKey]));
        y.domain([0, d3.max(d11, (d) => d3.max(keys, (key) => d[key]))]).nice();
        svg.select(".x-axis").call(xAxis);
        svg.select(".y-axis").call(yAxis);

        var bars = svg
          .select(".groupedBars")
          .selectAll("g")
          .data(new_data)
          .join("g")
          .attr("transform", (d) => "translate(" + x0(d[groupKey]) + ",0)")
          .selectAll("rect")
          .data((d) =>
            keys.map((key) => ({
              key,
              value: d[key],
              hoverText: d["hoverTextOf" + key],
            }))
          )
          .join("rect")
          .attr("x", (d) => x1(d.key))
          .attr("y", (d) => y(d.value))
          .attr("width", x1.bandwidth())
          .attr("height", (d) => y(0) - y(d.value))
          .attr("fill", (d) => color(d.key))
          .select("title")
          .text((d) => (showTitles ? d.hoverText : ""));
        svg.selectAll(".chartText2").remove();
        svg
          .select(".rectTextData")
          .selectAll(".chartText2")
          .data(new_data)
          .join("g")
          .attr("transform", (d) => "translate(" + x0(d[groupKey]) + ",0)")
          .selectAll(".chartText2")
          .data((d) => keys.map((key) => ({ key, value: d[key] })))
          .join("text")
          .attr("text-anchor", "middle")
          .attr("class", "chartText2")
          .attr("x", (d) => x1(d.key) + x1.bandwidth() / 2)
          .attr("y", (d) => y(d.value) - 3)
          .text((d) => d.value);
        bars.exit().remove();
      }
    }
  });
}

function createSvgElement(elementId) {
  return new Promise((resolve, reject) => {
    document.getElementById(elementId).innerHTML = "";
    if (document.getElementById(elementId).tagName === "SVG") {
      svg = d3.select("#" + elementId);
      width = +document.getElementById(elementId).clientWidth;
    } else {
      svg = d3
        .select("#" + elementId)
        .append("svg")
        .attr("id", elementId + "Svg")
        .attr("width", "100%")
        .attr("height", "400");
      width = +document.getElementById(elementId + "Svg").clientWidth;
    }
    height = +svg.attr("height");
    resolve();
  });
}

createGroupBarchartWithScrolling(
  "chart",
  data1,
  "Tahun -->",
  "Persentase Partisipasi Sekolah",
  false,
  false,
  false
);
