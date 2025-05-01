function _1(md){return(
md`# MOON VISUAL
`
)}

function _chart(d3,unemployment)
{
  // Declare the chart dimensions and margins.
  const width = 960;
  const height = 500;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Bin the data.
  const bins = d3.bin()
      .thresholds(40)
      .value((d) => d.phase)
    (unemployment);

  // Declare the x (horizontal position) scale.
  const x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bin.
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(bins)
    .join("rect")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => y(0) - y(d.length));

  // Add the x-axis and label.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call((g) => g.append("text")
          .attr("x", width)
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Moon Phase (%) →"));

  // Add the y-axis and label, and remove the domain line.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Haunted Sightings"));

  // Return the SVG element.
  return svg.node();
}


function _final_hw2_extract_dataset_subset1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("FINAL_HW2_EXTRACT_DATASET_subset (1).csv"),{from:{table:"FINAL_HW2_EXTRACT_DATASET_subset (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _unemployment(FileAttachment){return(
FileAttachment("FINAL_HW2_EXTRACT_DATASET_subset (1)@1.csv").csv()
)}

function _chart_2(d3,unemployment)
{
  // Declare the chart dimensions and margins.
  const width = 960;
  const height = 500;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Bin the data.
  const bins = d3.bin()
      .thresholds(40)
      .value((d) => d.diameter)
    (unemployment);

  // Declare the x (horizontal position) scale.
  const x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bin.
  svg.append("g")
      .attr("fill", "purple")
    .selectAll()
    .data(bins)
    .join("rect")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => y(0) - y(d.length));

  // Add the x-axis and label.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call((g) => g.append("text")
          .attr("x", width)
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Moon Size (diameter measured in arcseconds) →"));

  // Add the y-axis and label, and remove the domain line.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Haunted Sightings"));

  // Return the SVG element.
  return svg.node();
}


function _chart_3(d3,unemployment)
{
  // Declare the chart dimensions and margins.
  const width = 960;
  const height = 500;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Bin the data.
  const bins = d3.bin()
      .thresholds(40)
      .value((d) => d.distance)
    (unemployment);

  // Declare the x (horizontal position) scale.
  const x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bin.
  svg.append("g")
      .attr("fill", "pink")
    .selectAll()
    .data(bins)
    .join("rect")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => y(0) - y(d.length));

  // Add the x-axis and label.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call((g) => g.append("text")
          .attr("x", width)
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Distance to Moon (km) →"));

  // Add the y-axis and label, and remove the domain line.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Haunted Sightings"));

  // Return the SVG element.
  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["FINAL_HW2_EXTRACT_DATASET_subset (1).csv", {url: new URL("./files/d653661784916c75ed31d35f6acb2f9f51ef3dd5ec33fc83700f639bdad63833aeba1d017439f9336d2afd0786497a4f971dcf8559cfbe7fbf40997d19215e3a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["FINAL_HW2_EXTRACT_DATASET_subset (1)@1.csv", {url: new URL("./files/d653661784916c75ed31d35f6acb2f9f51ef3dd5ec33fc83700f639bdad63833aeba1d017439f9336d2afd0786497a4f971dcf8559cfbe7fbf40997d19215e3a.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","unemployment"], _chart);
  main.variable(observer("final_hw2_extract_dataset_subset1")).define("final_hw2_extract_dataset_subset1", ["__query","FileAttachment","invalidation"], _final_hw2_extract_dataset_subset1);
  main.variable(observer("unemployment")).define("unemployment", ["FileAttachment"], _unemployment);
  main.variable(observer("chart_2")).define("chart_2", ["d3","unemployment"], _chart_2);
  main.variable(observer("chart_3")).define("chart_3", ["d3","unemployment"], _chart_3);
  return main;
}
