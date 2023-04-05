import { RadarChart } from "./RadarChart.js"
var draw_legend = () => {
  //eslint-disable-next-line
  const width = $('.GlyphList').width()
  const height = $('.GlyphList').height()
  d3.select(`.GlyphList`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr('id',`svg_legend`)
  var radarChartOptions = {
      w: width,//Width of the circle
      h: height,
      x: height/2 - 20,
      y: height/2 - 18,
      levels: 1,
      maxValue: 1,
      roundStrokes: false,
      dotRadius: 2,
      strokeWidth: 1,
      opacityArea: 0.25,
      labelFactor: 0.8,
      fontsize: '8px',
      color: d3.scaleOrdinal().range(['rgb(80, 80, 80)', "rgb(59, 119, 176)"]),
  };
  var data = [
      {"name":"Mean","axes":[{"axis":"blur_focus","alias":"b","value":0.6,"quantile_25":0,"quantile_75":0,"mean":0,"median":0},{"axis":"copy_paste","alias":"c","value":0.33122762148337594,"quantile_25":0,"quantile_75":0,"mean":0,"median":0},{"axis":"no_face","alias":"f","value":0.38745436442084302,"quantile_25":0,"quantile_75":0,"mean":0,"median":0},{"axis":"headpose","alias":"h","value":0.43788819875776397,"quantile_25":0,"quantile_75":0,"mean":0,"median":0}],"color":"rgb(255, 127, 14)"},
      {"name":"Cheating","axes":[{"axis":"blur_focus","alias":"bf","value":0.5,"quantile_25":0.3,"quantile_75":0.9233333333333334,"mean":0.6,"median":0.55},{"axis":"copy_paste","alias":"cp","value":0.60588235294117646,"quantile_25":0.1,"quantile_75":0.5582352941176471,"mean":0.33122762148337594,"median":0.39411764705882353},{"axis":"no_face","alias":"nf","value":0.7,"quantile_25":0.157251908396946565,"quantile_75":0.8587786259541985,"mean":0.38745436442084302,"median":0.6717557251908396},{"axis":"headpose","alias":"hp","value":0.1,"quantile_25":0.24107142857142858,"quantile_75":0.5654761904761905,"mean":0.43788819875776397,"median":0.4226190476190476}],"color":"rgb(255, 127, 14)"}
      
  ]
  //eslint-disable-next-line
  var glyph = RadarChart(`#svg_legend`, data, radarChartOptions, this, "")

  var arc = d3.arc()

  d3.select(`#svg_legend`).append('path')
      .attr('transform', 'translate('+[height/2-20, height/2-18]+')')
      .attr('d', ()=>arc({
              innerRadius: width/2,
              outerRadius: width/2+5,
              startAngle: 0,
              endAngle: Math.PI*2*0.7
          }))
      .style('fill', '#8dd3c7')
      .style('opacity', 0.8)
      // .style('stroke', 'pink')
      // .style('stroke-width', 1)
  
  d3.select(`#svg_legend`).append('path')
      .attr('transform', 'translate('+[height/2-20, height/2-18]+')')
      .attr('d', ()=>arc({
              innerRadius: width/2+6,
              outerRadius: width/2+11,
              startAngle: 0,
              endAngle: Math.PI*2*8/14
          }))
      .style('fill', '#fdb462')
      .style('opacity', 0.8)

  var g_legend = d3.select(`#svg_legend`).append('g')
                  .attr('transform', 'translate('+[height/2-20, height/2-18]+')')
  
  // Legend of error bar
  g_legend.append('path')
      .attr('d', "M0, -27.8L60, -27.8")
      .attr('stroke', "rgb(100,100,100)")

  g_legend.append("text")
      .text('Quartile')
      .attr('x', 63)
      .attr('y', -25.5)
      .attr("font-size", "10px")
      .attr("fill", "rgb(100,100,100)");

  g_legend.append('path')
      .attr('d', "M0, -16.5L60, -16.5")
      .attr('stroke', "rgb(100,100,100)")

  g_legend.append("text")
      .text('Median')
      .attr('x', 63)
      .attr('y', -12.5)
      .attr("font-size", "10px")
      .attr("fill", "rgb(100,100,100)");

  g_legend.append('path')
      .attr('d', "M0, -9L60, -9")
      .attr('stroke', "rgb(100,100,100)")

  g_legend.append("text")
      .text('Quartile')
      .attr('x', 63)
      .attr('y', 0)
      .attr("font-size", "10px")
      .attr("fill", "rgb(100,100,100)");

  g_legend.append('path')
      .attr('d', "M2, 18L60, 18")
      .attr('stroke', "rgb(59, 119, 176)")

  g_legend.append("text")
      .text('Current Student')
      .attr('x', 63)
      .attr('y', 23)
      .attr("font-size", "10px")
      .attr("fill", "rgb(59, 119, 176)");

  g_legend.append('path')
      .attr('d', "M-6, 5L60, 5")
      .attr('stroke', "rgb(100,100,100)")

  g_legend.append("text")
      .text('Mean')
      .attr('x', 63)
      .attr('y', 11)
      .attr("font-size", "10px")
      .attr("fill", "rgb(100,100,100)");

  g_legend.append('path')
      .attr('d', "M0, 32L60, 32")
      .attr('stroke', '#8dd3c7')

  g_legend.append("text")
      .text('Time Length')
      .attr('x', 63)
      .attr('y', 34)
      .attr("font-size", "10px")
      .attr("fill", '#8dd3c7');

  g_legend.append('path')
      .attr('d', "M0, 39L60, 39")
      .attr('stroke', '#fdb462')

  g_legend.append("text")
      .text('Score')
      .attr('x', 63)
      .attr('y', 45)
      .attr("font-size", "10px")
      .attr("fill", '#fdb462');

  g_legend.append("rect")
      .attr("x", -12)
      .attr("y", 18.5215978681898)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "none")
      .attr("stroke", "rgb(60,60,60)")

  g_legend.append('path')
      .attr('d', "M-7, 28.52L-7, 47")
      .attr('stroke', "rgb(60,60,60)")

  g_legend.append("text")
      .text('Suspicious Type: b (blur & focus), ')
      .attr('x', -40)
      .attr('y', 57)
      .attr("font-size", "10px")
      .attr("fill", "rgb(60,60,60)");
  g_legend.append("text")
      .text("c (copy & paste), h (abnormal head")
      .attr('x', -40)
      .attr('y', 57)
      .attr('dy', '1.1em')
      .attr("font-size", "10px")
      .attr("fill", "rgb(60,60,60)");
  g_legend.append("text")
      .text(" pose), f (face disappearance)")
      .attr('x', -40)
      .attr('y', 57)
      .attr('dy', '2.2em')
      .attr("font-size", "10px")
      .attr("fill", "rgb(60,60,60)");

}

export { draw_legend }

