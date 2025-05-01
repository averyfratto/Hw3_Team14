import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# MAP VISUAL`
)}

function _final_hw2_extract_dataset_subset1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("FINAL_HW2_EXTRACT_DATASET_subset (1).csv"),{from:{table:"FINAL_HW2_EXTRACT_DATASET_subset (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _chart(d3,walmarts,legend,stateMesh)
{

  // Specify the map’s dimensions and projection.
  const width = 928;
  const height = 581;
  const projection = d3.geoAlbersUsa().scale(4 / 3 * width).translate([width / 2, height / 2]);

  // Create the container SVG.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  // Create the bins.
  const hexbin = d3.hexbin()
      .extent([[0, 0], [width, height]])
      .radius(10)
      .x(d => d.xy[0])
      .y(d => d.xy[1]);
  const projected = walmarts
    .map(d => {
      const xy = projection([d.longitude, d.latitude]);
      return xy ? {xy, distance: +d.distance_nearest_pow} : null;
    })
    .filter(d => d !== null);

  const bins = hexbin(projected)
    .map(d => (d.distance = d3.median(d, d => d.distance), d))
    .sort((a, b) => b.length - a.length);
    // Create the color and radius scales.
  const color = d3.scaleSequential()
  .domain([0, 7500])  // Manually set the domain to 0 to 10,000 meters
  .interpolator(d3.interpolateRdGy);  // Keep the chosen color scheme (Inferno in this case)
  const radius = d3.scaleSqrt([0, d3.max(bins, d => d.length)], [0, hexbin.radius() * Math.SQRT2]);

  svg.append("g")
    .attr("transform", "translate(580,20)")
    .append(() => legend({
      color,
      title: "Median distance to nearest PoW (m)", // or whatever unit you're using
      width: 260,
      tickFormat: d3.format(".1f") // optional: shows numbers with 1 decimal place
    }));

  // Append the state mesh.
  svg.append("path")
      .datum(stateMesh)
      .attr("fill", "none")
      .attr("stroke", "#777")
      .attr("stroke-width", 0.5)
      .attr("stroke-linejoin", "round")
      .attr("d", d3.geoPath(projection));

  svg.append("g")
  .selectAll("path")
  .data(bins)
  .join("path")
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .attr("d", d => hexbin.hexagon(radius(d.length)))
    .attr("fill", d => color(d.distance))
    .attr("stroke", d => d3.lab(color(d.distance)).darker())
  .append("title")
    .text(d => `${d.length.toLocaleString()} stores\n${d.distance.toFixed(1)} meters median distance`);

  return svg.node();
}


function _walmarts(d3,FileAttachment)
{
  const parseDate = d3.utcParse("%m/%d/%Y");
  return FileAttachment("FINAL_HW2_EXTRACT_DATASET_subset (1).csv").csv()
    .then(data => data.map((d) => ({
      longitude: +d["longitude"],
      latitude: +d["latitude"],
      date: parseDate(d["Haunted Places Date"]),
      distance_nearest_pow: +d.distance_nearest_pow,  // Ensure it's an integer
      most_common_religion: d.most_common_religion    // Add religion column
    })));
}


function _stateMesh(FileAttachment){return(
FileAttachment("us-counties-10m.json").json()
)}

function _d3(require){return(
require("d3@7", "d3-hexbin@0.2")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["FINAL_HW2_EXTRACT_DATASET_subset (1).csv", {url: new URL("./files/d653661784916c75ed31d35f6acb2f9f51ef3dd5ec33fc83700f639bdad63833aeba1d017439f9336d2afd0786497a4f971dcf8559cfbe7fbf40997d19215e3a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["us-counties-10m.json", {url: new URL("./files/fa57c96e4d12ed71ef161c8f40bbc1faecf531a73cd81ab1bbdeec4a1938455df0b41d3a706da69c5406c9cafd216765c6da36cc32df4cde66bdefc8062b7265.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("final_hw2_extract_dataset_subset1")).define("final_hw2_extract_dataset_subset1", ["__query","FileAttachment","invalidation"], _final_hw2_extract_dataset_subset1);
  main.variable(observer("chart")).define("chart", ["d3","walmarts","legend","stateMesh"], _chart);
  main.variable(observer("walmarts")).define("walmarts", ["d3","FileAttachment"], _walmarts);
  main.variable(observer("stateMesh")).define("stateMesh", ["FileAttachment"], _stateMesh);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  return main;
}
