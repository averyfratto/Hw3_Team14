function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Word cloud</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Word cloud

A demonstration of [d3-cloud](https://github.com/jasondavies/d3-cloud/). Paste into or edit the text below to update the chart. Note: word clouds [may be harmful](https://www.niemanlab.org/2011/10/word-clouds-considered-harmful/).`
)}

function _haunted1(FileAttachment){return(
FileAttachment("haunted@1.txt").text()
)}

function _d3Cloud(require){return(
require("d3-cloud@1")
)}

async function _words(FileAttachment){return(
(await FileAttachment("haunted@1.txt").tsv()).map(d => ({
  text: d.text,
  size: +d.size
}))
)}

function _WordCloud(d3Cloud,d3){return(
function WordCloud({
  words,
  width = 800,
  height = 400,
  fontFamily = "serif",
  text = d => d.text,
  size = d => d.size
}) {
  const layout = d3Cloud()
    .size([width, height])
    .words(words.map(d => ({ text: text(d), size: size(d) })))
    .padding(1)
    .rotate(() => 0)
    .font(fontFamily)
    .fontSize(d => d.size);

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg.append("g")
    .attr("transform", `translate(${width/2},${height/2})`);

  layout.on("end", placed => {
    g.selectAll("text")
      .data(placed)
      .join("text")
        .attr("font-family", fontFamily)
        .attr("font-size", d => `${d.size}px`)
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
  });

  layout.start();
  return svg.node();
}
)}

function _6(WordCloud,words){return(
WordCloud({ words })
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["haunted@1.txt", {url: new URL("./files/afabf8e5a767ceb4e144603efc6d772a4e090513f02a6c9abda94bf2d8cbb01f6f62b84e4d4cb9db98ebc7a5662c877c663fd768435bfa05eeaca079b907a5a3.txt", import.meta.url), mimeType: "text/plain", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("haunted1")).define("haunted1", ["FileAttachment"], _haunted1);
  main.variable(observer("d3Cloud")).define("d3Cloud", ["require"], _d3Cloud);
  main.variable(observer("words")).define("words", ["FileAttachment"], _words);
  main.variable(observer("WordCloud")).define("WordCloud", ["d3Cloud","d3"], _WordCloud);
  main.variable(observer()).define(["WordCloud","words"], _6);
  return main;
}

