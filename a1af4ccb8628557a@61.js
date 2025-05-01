import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Scatterplots Of Witness Count, Binge Drinking, Semantic Similarity, and Fuzzy Similarity`
)}

function _chart(data,d3,brush)
{

  // Specify the chart’s dimensions.
  const width = 928;
  const height = width;
  const padding = 60;
  const columns = Object.keys(data[0]).filter(d => typeof data[0][d] === "number");
  const size = (width - (columns.length + 1) * padding) / columns.length + padding;

  // Define the horizontal scales (one for each row).
  const x = columns.map(c => d3.scaleLinear()
      .domain(d3.extent(data, d => d[c]))
      .rangeRound([padding / 2, size - padding / 2]))

  // Define the companion vertical scales (one for each column).
  const y = x.map(x => x.copy().range([size - padding / 2, padding / 2]));

  // Define the color scale.
  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.ApparitionType))
      .range(d3.schemeCategory10);

  // Define the horizontal axis (it will be applied separately for each column).
  const axisx = d3.axisBottom()
      .ticks(6)
      .tickSize(size * columns.length);
  const xAxis = g => g.selectAll("g").data(x).join("g")
      .attr("transform", (d, i) => `translate(${i * size},0)`)
      .each(function(d) { return d3.select(this).call(axisx.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));

  // Define the vertical axis (it will be applied separately for each row).
  const axisy = d3.axisLeft()
      .ticks(6)
      .tickSize(-size * columns.length);
  const yAxis = g => g.selectAll("g").data(y).join("g")
      .attr("transform", (d, i) => `translate(0,${i * size})`)
      .each(function(d) { return d3.select(this).call(axisy.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
  

  const svg = d3.create("svg")
    .attr("width", width + padding * 2)  // Increased width
    .attr("height", height)
    .attr("viewBox", [-padding * 1.5, 0, width + padding * 1.5, height]);  // Increased left margin
  const types = Array.from(new Set(data.map(d => d.ApparitionType))); // unique types

  const legend = svg.append("g")
    .attr("transform", `translate(${padding}, 2)`)  // or even 0 if needed
    .style("font", "10px sans-serif")
    .attr("text-anchor", "start");
  
  legend.selectAll("rect")
    .data(types)
    .join("rect")
      .attr("x", (d, i) => i * 100)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", d => color(d));
  
  legend.selectAll("text")
    .data(types)
    .join("text")
      .attr("x", (d, i) => i * 100 + 18)
      .attr("y", 6)
      .attr("dy", "0.35em")
      .text(d => d);

  svg.append("style")
      .text(`circle.hidden { fill: #000; fill-opacity: 1; r: 1px; }`);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const cell = svg.append("g")
    .selectAll("g")
    .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
    .join("g")
      .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);

  cell.append("rect")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("x", padding / 2 + 0.5)
      .attr("y", padding / 2 + 0.5)
      .attr("width", size - padding)
      .attr("height", size - padding);

  cell.each(function([i, j]) {
    d3.select(this).selectAll("circle")
      .data(data.filter(d => !isNaN(d[columns[i]]) && !isNaN(d[columns[j]])))
      .join("circle")
        .attr("cx", d => x[i](d[columns[i]]))
        .attr("cy", d => y[j](d[columns[j]]));
  });

  const circle = cell.selectAll("circle")
      .attr("r", 3.5)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(d.ApparitionType));

  // Ignore this line if you don't need the brushing behavior.
  cell.call(brush, circle, svg, {padding, size, x, y, columns});

  
  // Column labels (top axis)
  svg.append("g")
    .style("font", "bold 10px sans-serif")
    .selectAll("text")
    .data(columns)
    .join("text")
      .attr("x", (d, i) => i * size + size / 2)
      .attr("y", padding / 2 - 6)
      .attr("text-anchor", "middle")
      .text(d => d);
  
  // Row labels (left axis)
  svg.append("g")
    .style("font", "bold 10px sans-serif")
    .selectAll("text")
    .data(columns)
    .join("text")
      .attr("x", -padding - 15)  // Increased padding to give space
      .attr("y", (d, i) => i * size + size / 2)
      .attr("transform", (d, i) => `rotate(-90, ${-padding - 15}, ${i * size + size / 2})`)
      .attr("text-anchor", "middle")
      .text(d => d);

  svg.property("value", [])
  return Object.assign(svg.node(), {scales: {color}});
}


function _selection(Generators,chart){return(
Generators.input(chart)
)}

function _brush(d3,data){return(
function brush(cell, circle, svg, {padding, size, x, y, columns}) {
  const brush = d3.brush()
      .extent([[padding / 2, padding / 2], [size - padding / 2, size - padding / 2]])
      .on("start", brushstarted)
      .on("brush", brushed)
      .on("end", brushended);

  cell.call(brush);

  let brushCell;

  // Clear the previously-active brush, if any.
  function brushstarted() {
    if (brushCell !== this) {
      d3.select(brushCell).call(brush.move, null);
      brushCell = this;
    }
  }

  // Highlight the selected circles.
  function brushed({selection}, [i, j]) {
    let selected = [];
    if (selection) {
      const [[x0, y0], [x1, y1]] = selection; 
      circle.classed("hidden",
        d => x0 > x[i](d[columns[i]])
          || x1 < x[i](d[columns[i]])
          || y0 > y[j](d[columns[j]])
          || y1 < y[j](d[columns[j]]));
      selected = data.filter(
        d => x0 < x[i](d[columns[i]])
          && x1 > x[i](d[columns[i]])
          && y0 < y[j](d[columns[j]])
          && y1 > y[j](d[columns[j]]));
    }
    svg.property("value", selected).dispatch("input");
  }

  // If the brush is empty, select all circles.
  function brushended({selection}) {
    if (selection) return;
    svg.property("value", []).dispatch("input");
    circle.classed("hidden", false);
  }
}
)}

function _data(data_raw){return(
data_raw.map(d => ({
  WitnessCount: d['Haunted Places Witness Count'],
  BingeDrinking: d['Binge Drinking Rate (%)'],
  SemanticSimilarity: d['Semantic Avg Similarity'],
  FuzzySimilarity: d['Fuzzy Avg Similarity'],
  EventType: d['Event Type'],
  ApparitionType: d['Apparition Type']
  
  
}))
)}

function _data_raw(FileAttachment){return(
FileAttachment("FINAL_HW2_EXTRACT_DATASET_subset (1).csv").csv({typed: true})
)}

function _final_hw2_extract_dataset_subset1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("FINAL_HW2_EXTRACT_DATASET_subset (1).csv"),{from:{table:"FINAL_HW2_EXTRACT_DATASET_subset (1)"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["FINAL_HW2_EXTRACT_DATASET_subset (1).csv", {url: new URL("./files/d653661784916c75ed31d35f6acb2f9f51ef3dd5ec33fc83700f639bdad63833aeba1d017439f9336d2afd0786497a4f971dcf8559cfbe7fbf40997d19215e3a.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["data","d3","brush"], _chart);
  main.variable(observer("selection")).define("selection", ["Generators","chart"], _selection);
  main.variable(observer("brush")).define("brush", ["d3","data"], _brush);
  main.variable(observer("data")).define("data", ["data_raw"], _data);
  main.variable(observer("data_raw")).define("data_raw", ["FileAttachment"], _data_raw);
  const child1 = runtime.module(define1);
  main.import("swatches", child1);
  main.variable(observer("final_hw2_extract_dataset_subset1")).define("final_hw2_extract_dataset_subset1", ["__query","FileAttachment","invalidation"], _final_hw2_extract_dataset_subset1);
  return main;
}
