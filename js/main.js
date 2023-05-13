d3.csv("data/Angka Partisipasi Sekolah 2017.csv", d3.autotype).then((data) => {
  /*
  
  Data SD
  
  */
  var margin = { top: 20, right: 20, bottom: 200, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // Define x and y scales
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.2)
    .domain(data.map((d) => d.Provinsi));
  var y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.SD)]);

  // Create chart container and set dimensions
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create x-axis
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Create y-axis
  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

  // Create bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.Provinsi))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.SD))
    .attr("height", (d) => height - y(d.SD))
    .attr("fill", "red");

  // Add chart title
  svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Data Partisipasi SD 2011");

  // Rotate x-axis labels
  svg
    .selectAll(".x-axis text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  /*
  
  Data SMP
  
  */
  var margin = { top: 20, right: 20, bottom: 200, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // Define x and y scales
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.2)
    .domain(data.map((d) => d.Provinsi));
  var y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.SMP)]);

  // Create chart container and set dimensions
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create x-axis
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Create y-axis
  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

  // Create bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.Provinsi))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.SMP))
    .attr("height", (d) => height - y(d.SMP));

  // Add chart title
  svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Data Partisipasi SMP 2011");

  // Rotate x-axis labels
  svg
    .selectAll(".x-axis text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  /*
  
  Data SMA
  
  */
  var margin = { top: 20, right: 20, bottom: 200, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // Define x and y scales
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.2)
    .domain(data.map((d) => d.Provinsi));
  var y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.SMA)]);

  // Create chart container and set dimensions
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create x-axis
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Create y-axis
  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

  // Create bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.Provinsi))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.SMA))
    .attr("height", (d) => height - y(d.SMA));

  // Add chart title
  svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Data Partisipasi SMA 2011");

  // Rotate x-axis labels
  svg
    .selectAll(".x-axis text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  /*
  
  Data PT
  
  */
  // Define chart dimensions
  var margin = { top: 20, right: 20, bottom: 200, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // Define x and y scales
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.2)
    .domain(data.map((d) => d.Provinsi));
  var y = d3.scaleLinear().range([height, 0]).domain([0, 50]);

  // Create chart container and set dimensions
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create x-axis
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Create y-axis
  svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

  // Create bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.Provinsi))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.PT))
    .attr("height", (d) => height - y(d.PT));

  // Add chart title
  svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Data Partisipasi PT 2011");

  // Rotate x-axis labels
  svg
    .selectAll(".x-axis text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");
});
