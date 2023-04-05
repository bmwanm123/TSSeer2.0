import { interactionN, SBehaviors, TeacherNDA, word } from "../data/LVData/SV.js";
import { ClusterR } from "./StuClust.js";


var fills = ['#00779C', '#00465C', '#54B8B1', '#377874', '#455560', '#7C99AC', '#F5CC49', '#F5CC9C', '#A8353D', '#682126'],
height = $('.up-DNA').height(),
width = $('.up-DNA').width(),
h = height * 0.7,
coh = h / 7,
// h = height,
w = width,
// numX = 40,
numX = TeacherNDA[0].DNA.length +15 ,
numY = 30,
speed = 0.02,
torsion = 0.2,
x = d3.scaleLinear().range([w * 0.1, w - 10]),
  y = d3.scaleLinear().range([h, 10]),
  y1 = d3.scaleLinear().range([h * 0.44, 10]),
// y = d3.scaleOrdinal().range([coh/2, coh * 1.5, coh * 2.5, coh * 3.5, coh * 4.5, coh * 5.5, coh * 6.5]),
  z = d3.scaleLinear().range([10, 2]),
H = d3.scaleOrdinal()
.domain(['#FFD700', '#5CACEE', '#9370DB', '#B4EEB4', '#CFCFCF', '#66CDAA', '#EE6363'])
    .range([0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1]),
H1 = d3.scaleOrdinal()
.domain(['#FFD700', '#5CACEE', '#9370DB', '#B4EEB4', '#CFCFCF', '#66CDAA', '#EE6363'])
  .range([1 * .14, 1 * .28, 1 *.42, 1 * .56, 1 * .7, 1 * .84, 1 * 1])

var counter = 0;

var colors = d3.scaleLinear()
    .domain([0, h * .16, h * .32, h * .48, h * .64, h * .82, h])
    .range(['#FFD700', '#5CACEE', '#9370DB', '#B4EEB4', '#CFCFCF', '#66CDAA', '#EE6363'])

var colors_H = d3.scaleOrdinal()
  .domain(['#FFD700', '#5CACEE', '#9370DB', '#B4EEB4', '#CFCFCF', '#66CDAA', '#EE6363'])
  .range([0, h * .16, h * .32, h * .48, h * .64, h * .82, h])

var DNAHelix = () => {
    var svg = d3.select(".STVShow")
      .attr("width", width)
    .attr("height", height)
  
  //颜色比例尺
  var bardata = [];

  for (var i = 0; i < 14; i++) {
    bardata.push(Math.random())
  }
  var ColorLine = svg.append('g')
    .attr('class', 'ColorLine')
    .attr("width", w * 0.1)
    .attr("height", h)
  .attr('transform', "translate(" + (5) + "," + (10) + ")")
  var CLengen = ColorLine.selectAll('.colorlengen')
    // .data(colors.range())
    .data(bardata)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
    return "translate(" + (10) + "," + ((h / 14) * i) + ")"
  })

  CLengen.append("rect")
      .attr("x", 0)
      .attr("width", 25)
    .attr("height", h / 14 +1)
    .attr('border', '0px')
    .style("fill", function (d, i) {
        return colors(( (i) / 13) * h)
      });
  

      
  var DNABox = svg.append('g')
    .attr('class', 'DNABOX')
  
  DNABox.append("rect")
    .attr("width", w * 0.9)
    .attr("height", h)
    .attr("fill", "white")
    .attr('transform', "translate(" + (w * 0.1) + "," + (10) + ")")
    .on("mousemove", function (event) {
      torsion = 0.5 * d3.pointer(event)[0] / w;
    });
  
  var container = svg.append("g")
    .attr('transform', "translate(" + (0) + "," + (7) + ")")
 
  var DNAPATH = svg.append('g')
    .attr('class', 'NDAPATH')
    .attr('transform', "translate(" + (0) + "," + (7) + ")")
  
  var DNAPATH1 = svg.append('g')
  .attr('class', 'NDAPATH1')
  .attr('transform', "translate(" + (0) + "," + (7) + ")")

  setInterval(draw(container, counter++, DNAPATH, DNAPATH1), 25);
  
  // 学生视图展示
  StuSummary(svg)
}


var generateData = (counter) => {
  // counter++;
  var data = d3.range(numX).map(function (d, i) {
    var t = d * torsion - speed * counter;
      return [
        {
          x: d,
          y: Math.cos(t),
          z: Math.sin(t)
        },
        {
          x: d,
          y: Math.cos(t) - 0.65,
          // y: Math.cos(t - Math.PI),
          // y: Math.tanh(t),
          z: Math.sin(t - Math.PI)
          // z: Math.sin(t)
        }
      ]
  });

  // var data = face_audio

  var flat = _.flatten(data);
  x.domain(d3.extent(flat, function (d) { return d.x }));
  y.domain(d3.extent(flat, function (d) { return d.y }));
  z.domain(d3.extent(flat, function (d) { return d.z }));

  // var data = a

  console.log(data,counter)
  return data
}

// var generateData = (counter) => {
//   // counter++;
//   var data = d3.range(TeacherNDA[0].DNA.length).map(function (d) {
//     console.log(d,TeacherNDA[0].DNA[d].colors.c)
//     return [
//       {
//         x: d,
//         y: Math.cos(H1(TeacherNDA[0].DNA[d].colors.c)),
//         z: 1
//       },
//       {
//         x: d,
//         y: Math.cos(H1(TeacherNDA[0].DNA[d].colors.b)),
//         z: 1
//       }
//     ]
//   });

//   var flat = _.flatten(data);
//   x.domain(d3.extent(flat, function (d) { return d.x }));
//   y.domain(d3.extent(flat, function (d) { return d.y }));
//   z.domain(d3.extent(flat, function (d) { return d.z }));


//   console.log(data)
//   return data
// }


var interacN_num = []
var PointD = []
var pathString = []
var interacN = []
var draw = (container,counter, NDAPATH, NDAPATH1) => {
  var cont = container.selectAll("g").data(generateData(counter))
  cont.exit().remove();
  
  // 创建一个弹框div
  var WordCloudBox = d3.select('.Sentencebody').append('div')
    .attr('class', 'wordcloudbox')
    .style('opacity', '0')
  .style('border','solid')
  
  var wordsvg = d3.select(".wordcloudbox")
    .append('svg')
    .attr("width", '300px')
    .attr("height", '180px')
    .attr("class", "wordcloudshow")
    .style('opacity', '0')

      var enter = cont.enter()
        .append("g")
        .attr("class", function (d,i) {
          return `circle${i}`
        })
        .each(function (d, index) {
          if (index < 40) {
            interacN_num.push(d)
          }
          PointD.push(d)
          // d3.select(this)
          //   .selectAll("circle")
          //   .data(d)
          //   .enter()
          //   .append("circle")
          //   // .attr("fill", "black")
          //   .attr("cx", function (d) {
          //     return x(d.x)
          //   })
          //   .attr("cy", function (d) { return y(d.y) })
          //   .attr("r", function (d) { return z(d.z) })
          //   .attr("fill-opacity", function (d) { return z(d.z) / 10 })
          //   .attr("fill", function (d, i) { return fills[index % 7]; })
  

          var inverted = (d[0].y < d[1].y) ? 1 : -1;
          d3.select(this).append('line')
            .attr("stroke", function (d, i) {
              // return fills[index % 7]
              return '#828282'
            })
            .attr("stroke-width", 2)
            .attr("x2", x(d[0].x))
            .attr("x1", x(d[0].x))
            .attr("y2", y(d[0].y) - inverted * z(d[0].z))
            .attr("y1", function (d,i) {
              if (index > 5 && index < 25) {
                return y(d[1].y - 0.26)+ inverted * z(d[1].z)
              }
              if (index >= 25 && index < 40) {
                return y(d[1].y + 0.1) + inverted * z(d[1].z)
              }
              if (index >= 40 && index < 55) {
                return y(d[1].y - 0.27) + inverted * z(d[1].z)
              }
          
              if (index <= 5 || index >= 55) { 
                return y(d[1].y + 0.21) + inverted * z(d[1].z)
              }
            })
            // .attr("y1", y(d[1].y) + inverted * z(d[1].z))
            .attr("opacity", 0.3 * inverted * (d[1].y - d[0].y))
            // .on('mouseover', function (d, i) {
            .on('mouseover', function (d, i) {
              WordCloudS()
              d3
              .select(this)
              .style('cursor', 'pointer')
              .transition()
              .duration(200)
              .attr("r", 30)
                .attr('stroke', 'red')
              
            WordCloudBox.style('opacity', '1')
              .style('left', (d.pageX)+ 'px')
                .style('top', (d.pageY - h * 0.9) + 'px')
              .style('boder', 'solid')
              
            wordsvg.style('opacity', '1')
            .style('left', (d.pageX)+ 'px')
              .style('top', (d.pageY -h*0.9) + 'px')
              
            })
            .on("mouseout", function(d, i) {
              d3
                .select(this)
                .transition()
                .duration(300)
                .attr("r", 10)
                .attr('stroke', fills[index % 7])
              
              WordCloudBox.style('opacity', '1')
        
            })
          //   .on('click', function (d, i) {
          //     d3.select('.StudentCluster')
          //       .style('opacity', '1')
          //       .style('z-index', '2')
              
          //     d3.select('.Sentencebody')
          //       // .style('opacity', '1')
          //     .style('z-index', '1')
          // })
          
          //连接线
          if (index > 0) {
            // d3.select(this).append('line')
            // .attr("stroke", function (d, i) { return fills[index % 7] })
            // .attr("stroke-width", 2)
            // .attr("x2", x(d[0].x))
            // .attr("x1", x(PointD[index - 1][0].x))
            // .attr("y2", y(d[0].y) - z(d[0].z))
            // .attr("y1", y(PointD[index - 1][0].y) - z(PointD[index - 1][0].z))
            //   .attr("opacity", 0.5)
            
            //   d3.select(this).append('line')
            //   .attr("stroke", function (d, i) { return fills[index % 7] })
            //   .attr("stroke-width", 2)
            //   .attr("x2", x(d[0].x))
            //   .attr("x1", x(PointD[index - 1][0].x))
            //   .attr("y2", y(d[0].y) + z(d[0].z))
            //   .attr("y1", y(PointD[index - 1][0].y) + z(PointD[index - 1][0].z))
            //     .attr("opacity", 0.5)
 
            
            //   d3.select(this).append('line')
            //   .attr("stroke", function (d, i) { return fills[index % 7] })
            //   .attr("stroke-width", 2)
            //   .attr("x2", x(d[1].x))
            //   .attr("x1", x(PointD[index - 1][1].x))
            //   .attr("y2", y(d[1].y) - z(d[1].z))
            //   .attr("y1", y(PointD[index - 1][1].y) - z(PointD[index - 1][1].z))
            //   .attr("opacity", 0.5)
            
            //   d3.select(this).append('line')
            //   .attr("stroke", function (d, i) { return fills[index % 7] })
            //   .attr("stroke-width", 2)
            //   .attr("x2", x(d[1].x))
            //   .attr("x1", x(PointD[index - 1][1].x))
            //   .attr("y2", y(d[1].y) + z(d[1].z))
            //   .attr("y1", y(PointD[index - 1][1].y) + z(PointD[index - 1][1].z))
            //   .attr("opacity", 0.5)
            
            pathString.push("M " + (x(PointD[index-1][0].x)) + " " + (y(PointD[index-1][0].y) - z(PointD[index-1][0].z)) + " "
              + "L" + " " + (x(d[0].x)) + " " + (y(d[0].y) - z(d[0].z)) + " " +
              "L" + " " + (x(d[0].x)) + " " + (y(d[0].y) + z(d[0].z)) + " " +
              "L" + " " + (x(PointD[index - 1][0].x)) + " " + (y(PointD[index - 1][0].y) + z(PointD[index - 1][0].z)) + " " +
              "L" + " " + (x(PointD[index - 1][0].x)) + " " + (y(PointD[index - 1][0].y) - z(PointD[index - 1][0].z)) + " Z")
            
            pathString.push("M " + (x(PointD[index-1][1].x)) + " " + (y(PointD[index-1][1].y) - z(PointD[index-1][1].z)) + " "
              + "L" + " " + (x(d[1].x)) + " " + (y(d[1].y) - z(d[1].z)) + " " +
              "L" + " " + (x(d[1].x)) + " " + (y(d[1].y) + z(d[1].z)) + " " +
              "L" + " " + (x(PointD[index - 1][1].x)) + " " + (y(PointD[index - 1][1].y) + z(PointD[index - 1][1].z)) + " " +
            "L"+" "+(x(PointD[index - 1][1].x))+" "+(y(PointD[index - 1][1].y) - z(PointD[index - 1][1].z))+" Z")

            // pathString.push("M " + (x(PointD[index-1][0].x)) + " " + (y(PointD[index-1][0].y) - z(PointD[index-1][0].z)) + " "
            //   + "Q" + " " + (x(d[0].x / 2)) + " " + (y(d[0].y) / 2) + " " + (x(d[0].x)) + " " + (y(d[0].y) - z(d[0].z)) + " " +
            //   "L" + " " + (x(d[0].x)) + " " + (y(d[0].y) + z(d[0].z)) + " " +
            //   "Q" + " " + (x(d[0].x / 2)) + " " + (y(d[0].y) / 2) + " " + (x(PointD[index - 1][0].x)) + " " + (y(PointD[index - 1][0].y) + z(PointD[index - 1][0].z)) + " " +
            //   "L" + " " + (x(PointD[index - 1][0].x)) + " " + (y(PointD[index - 1][0].y) - z(PointD[index - 1][0].z)) + " Z")
            
            // pathString.push("M " + (x(PointD[index-1][1].x)) + " " + (y(PointD[index-1][1].y) - z(PointD[index-1][1].z)) + " "
            //   + "Q" + " " + (x(d[1].x / 2)) + " " + (y(d[1].y) / 2) + " " + (x(d[1].x)) + " " + (y(d[1].y) - z(d[1].z)) + " " +
            //   "L" + " " + (x(d[1].x)) + " " + (y(d[1].y) + z(d[1].z)) + " " +
            //   "Q" + " " + (x(d[1].x / 2)) + " " + (y(d[1].y) / 2) + " " + (x(PointD[index - 1][1].x)) + " " + (y(PointD[index - 1][1].y) + z(PointD[index - 1][1].z)) + " " +
            // "L"+" "+(x(PointD[index - 1][1].x))+" "+(y(PointD[index - 1][1].y) - z(PointD[index - 1][1].z))+" Z")
  
            // d3.select(this).append('path')
          }
        });
  
  // 绘制路径1
  // for (var item = 0; item < 2; item++){
  //   pathString.push("M "+ (x(PointD[0][item].x))+" "+(y(PointD[0][item].y)-z(PointD[0][item].z))+" ")
  //   for (var i = 1; i < PointD.length; i++) {
  //     var px = x(PointD[i][item].x)
  //     var py = y(PointD[i][item].y)-z(PointD[i][item].z)
  //     pathString[item]+=" L"+" "+(px)+" "+(py)+" "
  //   }
  //   pathString[item] += " L" + " " + (x(PointD[39][item].x)) + " " + (y(PointD[39][item].y) + z(PointD[39][item].z))+" "
  //   for (var i = 38; i >= 0; i--) {
  //     var px = x(PointD[i][item].x)
  //     var py = y(PointD[i][item].y)+z(PointD[i][item].z)
  //     pathString[item]+=" L"+" "+(px)+" "+(py)+" "
  //   }
  //   pathString[item] += " L" + " " + (x(PointD[0][item].x)) + " " + (y(PointD[0][item].y) - z(PointD[0][item].z))+" Z"

    
  // }
  //路劲
  // NDAPATH.selectAll("path").data(pathString)
  //     .enter().append("path")
  //     .attr("d", function (d) { return d; })
  //   .attr("fill", function (d, i) {
  //     if (i % 2 == 0) {
  //       return colors(y(PointD[i /2][0].y))
  //     }
  //     if (i % 2 == 1) {
  //       return colors(y(PointD[(i-1) / 2][1].y))
  //     }    
  //   })

  //曲线
  var data_0 = []
  var data_1 = []
  var index = 0
  var index1 = 0
  for (var i = 0; i < PointD.length; i++){
    data_0.push(PointD[i][0].y)
    data_1.push(PointD[i][1].y)
  }
  
  let scale_x = d3.scaleLinear()
    .domain([0, data_0.length - 1])
    .range([w*0.1, w - 10])
  let scale_y_0 = d3.scaleLinear()
    .domain([d3.min(data_0), d3.max(data_0)])
    .range([height * 0.55, 10])
  let scale_y_1 = d3.scaleLinear()
    .domain([d3.min(data_1), d3.max(data_1)])
    .range([height * 0.75, 10])
  
    let curve_generator_0 = d3.line()
      .x(function (d, i) {
            return scale_x(index+i)
      })
      .y(function (d, i) {
        return scale_y_0(d)
      })
    .curve(d3.curveBasis)
  
    let curve_generator_1 = d3.line()
    .x(function (d, i) {
          return scale_x(index1 + i)
    })
    .y(function (d, i) {
      return scale_y_1(d)
    })
  .curve(d3.curveBasis)
  
  for (var i = 0; i < data_0.length-2; i++){
    var midata = []
    midata.push(data_0[i])
    midata.push(data_0[i + 1])
    // midata.push(data_0[i+2])
    index = i
    NDAPATH
    .append('path')
    .attr('d', curve_generator_0(midata))
    .attr('stroke', colors(y(data_0[i+1])))
    .attr('stroke-width', 13) 
    .attr('fill', function (d, i) {
      return 'none'
    })

    var midata1 = []
    if (i > 20 && i <39) {
      midata1.push(data_1[i] - 0.18)
      midata1.push(data_1[i + 1] - 0.18)
      midata1.push(data_1[i+2] - 0.18)
    }
    if (i >= 39 && i < 53) {
      midata1.push(data_1[i] - 0.07)
      midata1.push(data_1[i + 1] - 0.07)
      midata1.push(data_1[i+2] - 0.07)
    }

    if(i<= 20 || i >=53) {
      midata1.push(data_1[i] - 0.1 )
    midata1.push(data_1[i + 1] -0.1)
    midata1.push(data_1[i+2] -0.1)
    }
    index1 = i
    NDAPATH1
    .append('path')
    .attr('d', curve_generator_1(midata1))
    .attr('stroke', colors(y(data_1[i+1])))
      .attr('stroke-width', function () {
          return 13
    }) 
    .attr('fill', function (d, i) {
      return 'none'
    })
  }


  
  // pathString.push("M "+ (x(PointD[0][0].x))+" "+(y(PointD[0][0].y)-z(PointD[0][0].z))+" ")
  // for (var i = 1; i < PointD.length; i++) {
  //   var px = x(PointD[i][0].x)
  //   var py = y(PointD[i][0].y)-z(PointD[i][0].z)
  //   pathString[0]+=" L"+" "+(px)+" "+(py)+" "
  // }
  // pathString[0] += " L" + " " + (x(PointD[39][0].x)) + " " + (y(PointD[39][0].y) + z(PointD[39][0].z))+" "
  // for (var i = 38; i >= 0; i--) {
  //   var px = x(PointD[i][0].x)
  //   var py = y(PointD[i][0].y)+z(PointD[i][0].z)
  //   pathString[0]+=" L"+" "+(px)+" "+(py)+" "
  // }
  // pathString[0] += " L" + " " + (x(PointD[0][0].x)) + " " + (y(PointD[0][0].y) - z(PointD[0][0].z))+" Z"
  // console.log(pathString[0])
  // container.selectAll("path").data(pathString)
  //   .enter().append("path")
  //   .attr("d", function (d) { return d; })
  //   .attr("fill", "red")
  
  
}

// 词云展示
var WordCloudS = () => {
  const width = $('.wordcloudshow').width()
  const height = $('.wordcloudshow').height()

  // var svg = d3.select(".wordcloudshow")
  //  .attr("width", width)
  //   .attr("height", height)
  
  // var data = wordData
  var data = word
  const trendHeight = height
  const fontFamilies = ['Open Sans', 'Pacifico', 'impact']
  const fonts = d3.scaleLinear()
      .domain([1, d3.max(data.map(d => d.cnt))])
      .range([0, 2]);
  const s = d3.scaleSqrt()
      .domain([1, d3.max(data.map(d => d.cnt))])
      .range([10, 30]);
  // const wordColors = d3.scaleOrdinal()
  //     .domain(agendas.map((v, i) => i))
  //     .range(d3.schemeSet2)
  //     .unknown('black')
  const sentenceFontSize = 16
  // Compute default domains.
  // Construct a line generator.
  const svg = d3.select(".wordcloudshow")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("text-anchor", "middle")
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  svg.selectAll("*").remove() // 移除残留的元素s
  const sentence = svg.append("g")
    .attr("transform", `translate(${15},${15})`)
  
  // const colors_w = d3.scaleOrdinal()
  //   .domain(['neutral', 'happy', 'anger', 'surprise', 'disgust'])
  //   .range(['#CFCFCF', '#FFD700', '#EE6363', '#5CACEE', '#9370DB'])
  var colorsW =  ['#CFCFCF', '#FFD700', '#EE6363', '#9370DB', '#5CACEE']

  const layout = d3.layout.cloud()
      .size([width, height])
      .words(data)
      .padding(0)
      .rotate(() => 0)
    .font(d => fontFamilies[fonts(d.cnt)])
    .fontSize(d => s(d.cnt))
    .on("word", ({ size, x, y, rotate, word, cnt, sentences, agenda }) => {
      console.log(word,agenda)
      sentences = [...new Set(sentences)]
      const texttext = svg.append("text")
          .attr("font-size", size)
          .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
        .text(word)
        .style('fill', colorsW[agenda])
          // .style('fill', wordColors(agenda))
          .classed("click-only-text", true)
          .classed("word-default", true)
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut)
          // .on("click", handleClick);

      texttext.append("title").text(agenda);

      function handleMouseOver(d) {
          d3.select(this)
              .classed("word-hovered", true)
            .transition(`mouseover-${word}`).duration(200).ease(d3.easeLinear)
            .style('cursor', 'pointer')
              .attr("font-size", size + 2)
              .attr("font-weight", "bold");
      }

      function handleMouseOut(d) {
          d3.select(this)
              .classed("word-hovered", false)
              .interrupt(`mouseover-${word}`)
              .attr("font-size", size)
              .attr("font-weight", "none")
      }

      function handleClick(event) {
          sentence.selectAll("*").remove()
          sentence.append("foreignObject")
              .attr("width", cfg.w - cfg.margin.right - cfg.margin.left)
              .attr("height", cfg.h * 2 / 3 - cfg.margin.top)
              .style("overflow", "scroll")
              .style("overflow-x", "hidden")
              .attr("font-size", sentenceFontSize)
              .attr("font-family", 'Verdana')
              .selectAll("p")
              .data(sentences)
              .join("xhtml:p")
              .attr("style", "margin-bottom:10px")
              .selectAll("span")
              .data(d => {
                  const outPut = []
                  outPut.push(pav.method.formatSeconds(dialogs[d].startTime) + ": ")
                  d = dialogs[d].text
                  const wl = word.length
                  const indexs = []
                  const w = word.toLowerCase()
                  d = d.toLowerCase()
                  let start = 0
                  let i = d.indexOf(w, start)
                  while (i !== -1) {
                      indexs.push(i)
                      start = i + wl
                      i = d.indexOf(w, start)
                  }
                  let pre = 0
                  for (let i of indexs) {
                      if (i !== pre) {
                          outPut.push(d.slice(pre, i))
                      }
                      pre = i + wl
                      outPut.push(d.slice(i, pre))
                  }
                  outPut.push(d.slice(pre))
                  return outPut
              })
              .join("span")
              .text(d => d)
              .attr("style", d => `color:${d.toLowerCase() === word.toLowerCase() ? wordColors(agenda) : "none"}`)


      }
  });
  

  layout.start();
 

}

// 下方学生行为总结
var StuSummary = (svg) => {
  
  // svg.append('text')
  // .style("text-anchor", "begin")
  // .style("font", "18px sans-serif")
  // .style("color", 'rgba(0, 0, 0, 0.85)')
  //   .style("font-weight", 400)
  //   .attr('transform', function () {
  //   return 'translate(' + (0 ) + ',' + (height * 0.96) + ')'
  //   })
  // .text('Interaction')

  interacN = interactionN

  var HisY = d3.scaleLinear()
    .domain([0,100])
    .range([height * 0.92 , height * 0.83])
  
  var HisX = d3.scaleLinear()
    .domain([0, 40])
  .range([w * 0.1, w - 10])

  var StuHis = svg.append('g')
    .attr('class', 'StuHisgram')
    // .attr('transform', "translate(" + (0) + "," + (height*0.6) + ")")
  
  var IBar = StuHis.selectAll('.Hbar')
    .data(interacN_num)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      // var N = parseInt(Math.random() * (100 - 5 + 1) + 5, 10)
      // interacN.push(N)
    return 'translate(' + (HisX(d[0].x) ) + ',' + (HisY(interacN[i])) + ')'
    })
  
  
  IBar.append('rect')
    .attr('x', '1')
    .attr('width', '23')
    .attr("height", function (d,i) {
    return height * 0.92 - HisY(interacN[i])
    })
    .attr("stroke", "White")
    .attr('fill', '#D8BFD8')
  // .attr('fill', '#00BFFF')
  
  console.log(interacN)
  
  // 坐标轴
  var xAxis = d3.axisTop()
    .scale(HisX)
  svg.append('g')
    .call(xAxis)
    .attr('class','HisxAxis')
    .attr('transform', 'translate(' + (0) + ',' + (height) + ')')
  
  // 下方时序学生行为总结
  ShowRing()

}

var ShowRing = () => {

  var height = $('.down-ring').height()
  var width = $('.down-ring').width()
  var svg = d3.select(".SRing")
    .attr("width", width * 1.3)
    .attr("height", height)

  var colors_stu = [
    "#EE6363", //1
    '#9370DB', //2
    "#B4EEB4", //3
    "#FFD700", //4
    "#CFCFCF", //5
    "#66CDAA", //6
    "#5CACEE", //7
    "none"
  ];
  var colors = [
    "#8DEEEE", //1
    "#EEAD0E", //2
    "#E6E6FA", //3
    "#FFE4E1", //4
    "#ADD8E6", //5
    "#CDB38B", //6
  ];
  var ERW = width * 0.1
  var RingX = ['T1','T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
  var cR = height / 2 - 5
  var RxScale = d3.scaleOrdinal()
    .domain(RingX)
    .range([ERW*1, ERW*2, ERW*3, ERW*4, ERW*5, ERW*6, ERW*7, ERW*8, ERW*9, ERW*10, ERW*11, ERW*12])
  
  var scaleR = d3
    .scaleLinear()
    .range([0, 1])
    .domain([0, 8]);
  
  var arc = d3
    .arc() //圆弧生成器函数
    .outerRadius(cR -4); //圆弧外半径
  
  var arc1 = d3
    .arc()
    .outerRadius(cR + 4)
    .innerRadius(cR - 2);
  
  var pie = d3
    .pie()
    .sort(null)
    .value(function(d) {
      return d.size; 
    });
  
  var pieC = d3
    .pie()
    .sort(null)
    .value(function(d) {
      return d.num; 
    });
  
  var gRing = svg.append("g").attr("class", "Sturings") //一个视频对应的环
  var geachRing = gRing
      .selectAll(".AllRing")
      .data(SBehaviors)
      .enter()
    .append("g") 
      .attr("transform", function(d,i) {
        return "translate(" + (RxScale(d.TGroupId)) + "," + (cR+ 4) + ")"
      })
    .style("padding-left", '5px')
    .on('click', function (d, i) {  //i才是表示数据，d表示鼠标的一些属性
        //调用方法显示聚类
        ClusterR(i.VideoId,i.TGroupId)

        d3.select('.StudentCluster')
          .style('opacity', '1')
          .style('z-index', '2')
        
        d3.select('.Sentencebody')
        .style('z-index', '1')
     })
  
  var EG = geachRing
    .selectAll(".arc")
    .data(function(d) {
      let data = d.FaceEmos
      let tmp = pie(data);
      // console.log(tmp);
      return tmp;
    })
    .enter()
    .append("g")
    .attr("class", function() {
      return "RingsArc";
    })
    // .on('mouseover', function (d, i) {
    //   console.log(d,"掉哦哦")
    // })
  
    EG.append("path")
      .attr("d", function(d) {
        let xxxx = cR * (1 - scaleR(d.data.fratio)) * 0.6;
        arc.innerRadius(xxxx < 0 ? 0 : xxxx);
        d.innerRadius = xxxx < 0 ? 0 : xxxx;
        d.outerRadius = cR;
        let k = arc(d);
        return k;
      })
      .style("fill", function(d, i) {
        return colors_stu[i];
      });
  
    // 外层点击流可视化
    var gClick = geachRing
      .selectAll(".ClickArc")
      .data(function(d) {
        let ctem = pieC(d.Clicks)
        return ctem
      })
      .enter()
    .append("g")
    // .on('mouseover', function (d, i) {
    //   console.log(d,"掉哦哦")
    // })
  
    gClick.append("path")
      .attr("fill", function(d, i) {
        return colors[i];
      })
      .attr("d", function(d) {
        return arc1(d); //调用弧生成器，得到路径值
      });
}

export { DNAHelix };

