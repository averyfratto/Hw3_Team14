function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Word cloud</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Word cloud

)}

function _d3Cloud(require){return(
require("d3-cloud@1")
)}

async function _wordData(FileAttachment){return(
(await FileAttachment("haunted@1.txt").tsv()).map(d => ({
  text: d.text,
  size: +d.size
}))
)}

function _tooltip(){return(
(() => {
  const div = document.createElement("div")
  Object.assign(div.style, {
    position: "absolute",
    pointerEvents: "none",
    background: "rgba(0,0,0,0.7)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontFamily: "sans-serif",
    fontSize: "12px",
    visibility: "hidden"
  })
  document.body.appendChild(div)
  return div
})()
)}

function _WordCloud(d3,DOM,d3Cloud,tooltip,alert){return(
({ words }) => {
  // 1) create the SVG up front and return it at the end
  const svg = d3.select(DOM.svg(800, 400));
  const g   = svg.append("g")
                 .attr("transform", "translate(400,200)");

  // 2) configure the layout to render into that <g>
  const layout = d3Cloud()
    .size([800, 400])
    .words(words)
    .padding(5)
    .rotate(() => 0)
    .font("serif")
    .fontSize(d => d.size)
    .on("end", placed => {
      g.selectAll("text")
        .data(placed)
        .enter().append("text")
          .attr("font-family", "serif")
          .attr("font-size", d => `${d.size}px`)
          .attr("text-anchor", "middle")
          .attr("transform", d => `translate(${d.x},${d.y})`)
          .style("fill", "#000")
          .style("cursor", "pointer")
          .on("mouseover", (event, d) => {
            d3.select(event.currentTarget)
              .transition().duration(150)
              .attr("font-size", `${d.size * 1.1}px`)
              .attr("transform", `translate(${d.x},${d.y - 5})`);
            tooltip.textContent = `${d.text}: ${d.size}`;
            tooltip.style.visibility = "visible";
          })
          .on("mousemove", event => {
            tooltip.style.top  = `${event.pageY + 10}px`;
            tooltip.style.left = `${event.pageX + 10}px`;
          })
          .on("mouseout", (event, d) => {
            d3.select(event.currentTarget)
              .transition().duration(150)
              .attr("font-size", `${d.size}px`)
              .attr("transform", `translate(${d.x},${d.y})`);
            tooltip.style.visibility = "hidden";
          })
          .on("click", (event, d) => {
            alert(`You clicked "${d.text}" (${d.size})`);
          })
          .text(d => d.text);
    });

  // 3) kick off the layout
  layout.start();

  // 4) return your SVG node so the cell has something to display
  return svg.node();
}
)}

function _6(WordCloud,wordData){return(
WordCloud({ words: wordData })
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["haunted@1.txt", {url: new URL("./files/afabf8e5a767ceb4e144603efc6d772a4e090513f02a6c9abda94bf2d8cbb01f6f62b84e4d4cb9db98ebc7a5662c877c663fd768435bfa05eeaca079b907a5a3.txt", import.meta.url), mimeType: "text/plain", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("d3Cloud")).define("d3Cloud", ["require"], _d3Cloud);
  main.variable(observer("wordData")).define("wordData", ["FileAttachment"], _wordData);
  main.variable(observer("tooltip")).define("tooltip", _tooltip);
  main.variable(observer("WordCloud")).define("WordCloud", ["d3","DOM","d3Cloud","tooltip","alert"], _WordCloud);
  main.variable(observer()).define(["WordCloud","wordData"], _6);
  return main;
}
