import { ALLTSData, lvdata } from "../data/LVData/LV.js"
import { ALLRiver } from "../data/LVData/TRD.js"
import { River } from "./River.js"
import { WeatherWheel } from './weatherwheel.js'
// 图例

var Lengend = () =>{
  const width = $('.filter-bottom').width()
  const height = $('.filter-bottom').height()

  var svg = d3.select(".LVLengend")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "lengend")
  
  var BoxLengencolor = d3.scaleOrdinal()
    .domain(["anger", "disgust", "fear", "happiness", "neutral", "sad", "surprise",
      "play","pause", "seek forward", "seek back", "ratechange","volumechange"])
    .range(["#EE6363", "#9370DB", "#B4EEB4", "#FFD700", "#CFCFCF", "#66CDAA", "#5CACEE",
      "#8DEEEE", "#EEAD0E", "#E6E6FA", "#FFE4E1", "#ADD8E6", "#CDB38B"]);

  
  var BoxLengend = svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr("class","BoxLengend")
  .attr("transform", "translate(" + 10 + "," + 6 + ")")
  
  var eachLenH = height / 4
  var eachLenW = width / 4
  var legendbox = BoxLengend.selectAll(".legend")
      .data(BoxLengencolor.domain().slice())
      .enter()
      .append("g")
      .attr("class", "legend")
    .attr("transform", function (d, i) {
      if (i > 6) {
          i = i + 1 
        }
        var I = i % 4
        var J = Math.floor(i / 4)
        return "translate(" + (eachLenW * (I)) + "," + (eachLenH * J) + ")"
      })

  legendbox.append("rect")
      .attr("x", 0)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", BoxLengencolor);

  legendbox.append("text")
      .attr("x", 15)
      .attr("y", 5)
      .attr("dy", ".35em")
      .style("text-anchor", "begin")
      .style("font" ,"13px sans-serif")
      .text(function(d) { return d; });
  
}
Lengend()

// 层级视图展示所有
var LVALL = () => {
  const width = $('.VideoInfo').width()
  const height = $('.VideoInfo').height()

  var svg = d3.select(".LV-ALL")
  .attr("width", width)
  .attr("height", height)
    .attr("class", "ALLVideo")
  
    // 添加一个div
  var singleBox = d3.select('.VideoInfo').append('div')
    .attr('class', 'singlebox')
    .style('opacity', '0')
  
  var boxsvg = d3.select(".singlebox")
    .append('svg')
    .attr("width", '300px')
    .attr("height", '180px')
    .attr("class", "boxshow")
    .style('opacity', '0')
  
  var TITLE = ['InitialStage', 'Midterm', 'FinalStage', 'Easy', 'Medium', 'Hard']
  var numberL = [1,2,3,4,5,6,7,8,9]

  var XYTitle = svg.append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'XYTitle')
  
  var Y_Position = height / 4
  var X_Positon = width / 4
  
  var midLine = XYTitle.selectAll('.mid')
    .data(numberL.slice())
    .enter()
    .append('g')
    .attr('class', 'midline')
    // .attr('transform', function (d, i) {
    // return "translate(" + (X_Positon * (0.5 + d % 3)) + "," + (Y_Position *(i / 3))+ ")"
    // })
  
  midLine.append('line')
    .attr('x1', function (d, i) {
      console.log(d,i,X_Positon * (0.5 + d % 3),X_Positon)
      return (X_Positon * (1.5 + d % 3))
    })
    .attr('x2', function (d, i) {
      return (X_Positon * (1.5 + d % 3))
    })
    .attr('y1', function (d, i) {
      return (Y_Position *(1 + Math.floor(i / 3)) + 20)
    })
    .attr('y2', function (d, i) {
      return (Y_Position *(1 + Math.floor(i / 3)) + 55)
    })
    .attr('stroke', '#00BFFF')
    .attr('stroke-width', '5px')
    // .attr("stroke-opacity", 0.8)
    // .attr("stroke-dasharray", "2,2")
  

  
  var XYTPosition = XYTitle.selectAll('.xy')
    .data(TITLE.slice())
    .enter()
    .append('g')
    .attr('class', 'XYPositon')
    .attr('transform', function (d, i) {
      if (i < 3) {
        return "translate(" + (X_Positon * (i + 1) + 5) + "," + (Y_Position / 2)+ ")"
      }
      else {
        return "translate(" + 15 + "," + (Y_Position * (i % 3 + 1.6)) + ")"
      }
  })
  
  XYTPosition.append("text")
  .style("text-anchor", "begin")
    .style("font", "18px sans-serif")
    .style("color", 'rgba(0, 0, 0, 0.85)')
    .style("font-weight", 400)
    .text(function (d) { return d; });
  
  var XYLine = XYTitle.selectAll('.LINE')
    .data(TITLE.slice())
    .enter()
    .append('g')
    .attr('class', 'XYLine')
  
    XYLine.append('line')
    .attr('x1', function (d, i) {
      if (i >= 3) {
        return X_Positon
      }
      if (i == 2) {
        return X_Positon
      }
      else {
        return X_Positon * (i + 2)
      }
    })
    .attr('x2', function (d, i) {
      if (i >= 3) {
        return width
      }
      if (i == 2) {
        return width
      }
      else {
        return X_Positon * (i + 2)
      }
    })
    .attr('y1', function (d, i) {
      if (i >= 3) {
        return (Y_Position * (i % 3 + 2 ))
      }
      if (i == 2) {
        return Y_Position
      }
      else {
        return Y_Position / 2
      }
    })
    .attr('y2', function (d, i) {
      if (i >= 3) {
        return (Y_Position * (i % 3 + 2 ))
      }
      if (i == 2) {
        return Y_Position
      }
      else {
        return height
      }
    })
    .attr('stroke', '#9C9C9C')
    .attr('stroke-width', '1.5px')
    .attr("stroke-opacity", 0.8)
    .attr("stroke-dasharray", "2,2")

  var XYGlyph = XYTitle.selectAll('.glyph')
    .data(lvdata.slice())
    .enter()
    .append('g')
    .attr('class', 'Glyph')
    .attr('transform', function (d, i) {
      // if (d.Degree == 'simple') {
      //   return "translate(" + (X_Positon * (parseInt(d.Stage)) + X_Positon * d.diversity ) + "," + (Y_Position * 1 + Y_Position / 2)+ ")"
      // }
      // if (d.Degree == 'secondary') {
      //   return "translate(" + (X_Positon * (parseInt(d.Stage)) + X_Positon * d.diversity ) + "," + (Y_Position * 2 + Y_Position / 2)+ ")"
      // }
      // if (d.Degree == 'hard') {
      //   return "translate(" + (X_Positon * (parseInt(d.Stage)) + X_Positon * d.diversity ) + "," + (Y_Position * 3 + Y_Position / 2)+ ")"
      // }
      if (d.Degree == 'simple') {
        return "translate(" + (X_Positon * (parseInt(d.Stage)) + X_Positon * d.Interaction ) + "," + (Y_Position * 1 + Y_Position / 2)+ ")"
      }
      if (d.Degree == 'secondary') {
        return "translate(" + (X_Positon * (parseInt(d.Stage)) + X_Positon * d.Interaction ) + "," + (Y_Position * 2 + Y_Position / 2)+ ")"
      }
      if (d.Degree == 'hard') {
        return "translate(" + (X_Positon * (parseInt(d.Stage)) + X_Positon * d.Interaction ) + "," + (Y_Position * 3 + Y_Position / 2)+ ")"
      }
    })
  XYGlyph.append('circle')
    .style('fill', 'none')
    // .attr('class','gcircle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 10)
    .attr('stroke', '#9C9C9C')
    .attr('stroke-width', '2px')
    .on('mouseover', function (d, i) {  //这里d是mousevent信息，i是circle信息
      SingleBox(i)
      d3
        .select(this)
        .style('cursor', 'pointer')
        .transition()
        .duration(500)
        .attr("r", 20)
        .attr('stroke', 'red')
      
      singleBox.style('opacity', '0')
        .style('left', (d.pageX)+ 'px')
        .style('top', (d.pageY) + 'px')
      
      boxsvg.style('opacity', '1')
      .style('left', (d.pageX)+ 'px')
        .style('top', (d.pageY) + 'px')
    
    })
    .on("mouseout", function(d, i) {
      d3
        .select(this)
        .transition()
        .duration(300)
        // .attr("r", 20)
        .attr('stroke', '#9C9C9C')
        .attr('stroke', 'red')
      
      singleBox.style('opacity', '0')

    })
  
}
LVALL()

var SingleBox = (hisdata) => {
  const width = $('.boxshow').width()
  const height = $('.boxshow').height()

  var svg = d3.select(".boxshow")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "boxinfo")
  
  
  var datax = ['Angry', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sad', 'Surprise'];
  // var datay = [parseFloat(hisdata.Angry), parseFloat(hisdata.Disgust), parseFloat(hisdata.Fear), parseFloat(hisdata.Happiness), parseFloat(hisdata.Neutral), parseFloat(hisdata.Sad), parseFloat(hisdata.Surprise)];
  var datay = [0.2, 0.28, 0.1, 0.5, 0.75, 0.15, 0.16];
  var barW = (width - 35) / 7
  var colors = [
    '#EE6363',
    '#9370DB',
    '#B4EEB4',
    '#FFD700',
    '#CFCFCF',
    '#66CDAA',
    '#5CACEE'
  ]
  // x轴
  var xScale = d3.scaleOrdinal()
    .domain(datax)
    // .range([15+barW*1, 15+barW*2, 15+barW*3, 15+barW*4, 15+barW*5, 15+barW*6, 15+barW*7])
    .range([30+barW*0, 30+barW*1, 30+barW*2, 30+barW*3, 30+barW*4, 30+barW*5, 30+barW*6]);
  var xAxis = d3.axisBottom()
    .scale(xScale);
  svg.append('g')
    .call(xAxis)
    .attr("transform", "translate("+ 0 + "," + (height - 35) + ")")
    .selectAll("text")
    .attr("dx", "8px");
    
  // y轴      
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(datay)])
    .range([height - 30, 5]);
  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(2);
  svg.append('g')
    .call(yAxis)
    .attr("transform", "translate(" + 30 + ",-5)");
    
  
  var bar = svg.selectAll(".bar")
    .data(datay)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function (d, i) {
      return "translate(" +( xScale(datax[i])) + "," + yScale(d) + ")";
    });
    
  bar.append("rect")
    .attr("x", 1)
    .attr("width", barW)
    .attr("height", function(d) {
      return height - 35 - yScale(d);
    })
    .attr("stroke", "White")
    .attr('fill', function (d, i) {
      return colors[i]
    })
  
  
}

//1、 层级视图展示所选
var LVSelect = () => {
  const width_L = $('.single-left').width()
  const height_L = $('.single-left').height()
  const width_M = $('.single-middle').width()
  const heigh_M = $('.single-middle').height()
  const width_R = $('.single-right').width()
  const height_R = $('.single-right').height()

  // // 添加一个div 展示时序环图
  // var TemCircle = d3.select('.Levelbody').append('div')
  //   .attr('class', 'TemCircle')
  //   .style('opacity', '0')
  
  // var TCsvg = d3.select(".TemCircle")
  //   .append('svg')
  //   .attr("width", '528px')
  //   .attr("height", '579px')
  //   .attr("class", "TemCirShow")
  //   .style('opacity', '0')

  var svg_R = d3.select(".LV-box-R")
    .attr("width", width_R)
    .attr("height", height_R)
    .attr("class", "selectbox_R")
  
  var svg_L = d3.select(".LV-box-L")
    .attr("width", width_L)
    .attr("height", height_L)
    .attr("class", "selectbox_L")
  
  var svg_M = d3.select(".LV-box-M")
    .attr('width', width_M * 2)
    .attr('height', heigh_M)
    .attr('class', "selectbox_M")
  
   //三角形
   svg_R
   .append('path')
    //  .attr('d', 'M-22,-30 l 60,30 l -60,30 z')
     .attr('d', 'M0,0 l 60,110 l -60,110 z')
   .attr(
     'transform',
     'translate(' +(10) +',' + (10) +')')
    .attr('fill', '#ced4de')
  
    svg_L
    .append('path')
     //  .attr('d', 'M-22,-30 l 60,30 l -60,30 z')
      .attr('d', 'M0,110 l 60,-110 l 0,220 z')
    .attr(
      'transform',
      'translate(' +(10) +',' + (10) +')')
    .attr('fill', '#ced4de')
  
  // 柱状图展示
  var EVW = width_M / 2
  
  const ALLVideos = []
  var VideoGroup = svg_M.selectAll('.allselect')
    .data(function (d) {
      return lvdata
    })
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      ALLVideos.push(d.Emotions)
    return 'translate(' + (EVW * i) + ',' + (0) + ')'
  })
  
  
  var EVideo = VideoGroup.append('rect')
    .attr('width', EVW)
    .attr('height', heigh_M)
    .attr('class', (i) => 'VIDEO' + (i + 1))
    .style("stroke", "#FFEBCD")
    .style("stroke-width","1.5px")
    .style("fill", "none");
  

  
  var VHight = heigh_M
  for (var item = 0; item < ALLVideos.length; item++) {
    var VideoG = svg_M.append('g')
    .attr('class', 'VideoG')
    var hisdata = ALLVideos[item]
    var datax = ['Angry', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sad', 'Surprise'];
    var datay = [parseFloat(hisdata.Angry), parseFloat(hisdata.Disgust), parseFloat(hisdata.Fear), parseFloat(hisdata.Happiness), parseFloat(hisdata.Neutral), parseFloat(hisdata.Sad), parseFloat(hisdata.Surprise)];
    var barW = (EVW - 10) / 7
    // x轴
    var xScale = d3.scaleOrdinal()
      .domain(datax)
      .range([5+barW*0, 5+barW*1, 5+barW*2, 5+barW*3, 5+barW*4, 5+barW*5, 5+barW*6]);
      
    // y轴      
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(datay)])
      .range([VHight - 5, 5]);
    
    var count = 0

    var colors = [
      '#EE6363',
      '#9370DB',
      '#B4EEB4',
      '#FFD700',
      '#CFCFCF',
      '#66CDAA',
      '#5CACEE'
    ]
    
    var bar = VideoG.selectAll(".Vbar")
      .data(datay)
      .enter().append("g")
      .attr("class", "Vbar")
      .attr("transform", function (d, i) {
        return "translate(" +(EVW * item + xScale(datax[i])) + "," + yScale(d) + ")";
      })
      .on('mouseover', function (d, i) {
        d3.select(this)
          .style('cursor', 'pointer')
           .append('text')
          .text((d, i) => {
           return d
          })
          .classed('tip', true)
      })
      .on('mouseout', function (d, i) {
        d3.select('.tip')
          .remove()
      })
      .on('click', function (d, i) {
        // var CH = $('.Levelbody').height
        // var CW = $('.Levelbody').width
        // TemCircle.style('opacity', '1')
        //   .style('width', CW * 0.6)
        //   .style('height', CH)
        //   .style('top', '-582px')
        
        //   TCsvg.style('opacity', '1')
        
        
        d3.select('.CircleShow')
          .style('opacity', 1)
          .style('display', 'flex')
          .style('flex-direction', 'column')
          .style('z-index', '2')
        
        d3.select('.VideoInfo')
          .style('opacity', '0')
        .style('z-index', '1')
        
        // 1、
        d3.select('.SingleShow')
          .style('opacity', '0')
          .style('z-index', '1')
        
        // 2、
        d3.select('.SingleShow1')
        .style('opacity', '0')
        .style('z-index', '1')
        
        // 显示每一个课程教师情感与学生行为
        count = count + 1
        TSALLShow(count)

      })
       
    bar.append("rect")
      .attr("x", 1)
      .attr("width", barW)
      .attr("height", function(d) {
        return VHight - 10 - yScale(d);
      })
      .attr("stroke", "White")
      .attr('fill', function (d, i) {
        return colors[i]
      })
     
    
  }   
}
LVSelect()

// 2、展示学生行为
var BehaviorShow = () => {
  var count = 0
  const width = $('.StuShow').width()
  const height = $('.StuShow').height()
  var EW = width 
  var EH =height 
  var svg = d3.select(".StuShow")
    .attr('width', width)
    .attr('height', height)
    .attr('class', "Ring_Click")
  
  var Csvg = svg.append('g')
  .attr('class' , 'TRing')
  //弹框TS圆环设计
    var diameter = d3.min([EW, EH]) * 1.17
    var TSSVG = Csvg.append('g')
      .attr(
        'transform',
        'translate(' +
          (EW * 0.25 ) +
          ',' +
          (EH * 0.24)+
          ')'
      )
    .style('width', EW)
    .on('click', function (d, i) {
      
      d3.select('.CircleShow')
        .style('opacity', 1)
        .style('display', 'flex')
        .style('flex-direction', 'column')
        .style('z-index', '2')
      
      d3.select('.VideoInfo')
        .style('opacity', '0')
      .style('z-index', '1')
      
      // 2、
      d3.select('.SingleShow1')
      .style('opacity', '0')
      .style('z-index', '1')
      
      // 显示每一个课程教师情感与学生行为
      count = count + 1
      TSALLShow(count)

    })
  
    
    
    const wheel = new WeatherWheel(TSSVG) //svg画布作为参数
      .size([diameter, diameter])
      .data(ALLTSData[0].TSVClip[1].TSData)
        // .data(ALLTSData[1].TSVClip[5].TSData)
    .render()
  

   //点击流设计
  const width_R = $('.RiverS').width()
  const height_R = $('.RiverS').height()
  var svg_R = d3.select(".RiverS")
    .attr('width', width_R)
    .attr('height', height_R)
    .attr('class', "Ring_Click")
  
  var Rsvg = svg_R.append('g')
    .attr('class', 'TRiver')
  var RiverSVG = Rsvg.append('g')
    .attr(
      'transform',
      'translate(' +
        ( width_R * 0) +
        ',' +
        ( height_R * 0)+
        ')'
    )
    .style('width', width_R)
      .style('height', height_R)
      
     
  const TRiver = new River(RiverSVG) //svg画布作为参数
    .data(ALLRiver[0].TSVClip[1].RD)
    .size([width_R, height_R])
      .render() 

}
BehaviorShow()

var TSALLShow = (connt) =>{
  // 数据
  

  var XTITLE = []
  if (connt == 1) {
    const width = $('.circle-down').width()
    const heigh = $('.circle-down').height() 
    var EH = heigh / 3
    var EW = width / 3
    var svg = d3.select('.TSCircle-ALL')
      .attr('width', width + EW * 2.5)
      .attr('height', heigh )
      
    // 每一行的高度坐标位置比例尺
    const DegreeH = d3.scaleOrdinal()
      .domain(['Simple','Interim','Difficult'])
      .range([EH * 0,EH * 1,EH * 2]);

    var EVideo = d3.scaleOrdinal()
      .domain(['V0','V1','V2','V3','V4','V5'])
      .range([EW * 0,EW * 0.5,EW * 1.5,EW * 2.5,EW * 3.5, EW * 4.5]);
    
    
    var TSV = svg.append('g')
      .attr('class', 'AllTSV')
    
    var TST = svg.append('g')
      .attr('class',"Title")
    
    var TSClip = TSV.selectAll('.ATSV')
      .data(ALLTSData)
      .enter()
      .append('g')
      .attr('class', (i) => `Degree${i+1}`)
      .attr("transform", function (d) {
        return "translate(" + 0 + "," + (DegreeH(d.Degree)) + ")"; 
    });
    
    var ETSC = TSClip.selectAll('.ATSV')
      .data(function (d) {
        return d.TSVClip
      })
      .enter()
      .append('g')
      .attr('class', (i) =>  `TSClip${i + 1}`)
    
    ETSC.append('rect')
      .attr('x', function (d) {
      return EVideo(d.clip)
      })
      .attr('width', function (d) {
        if (d.clip == 'V0') {
          XTITLE.push(d)
          return EW / 2
        }
        else{return EW}
      })
      .attr('height', EH)
      .style("stroke", "#87CEEB")
      .style("stroke-width","1px")
      .style("fill", "none");


    var TT = TST.selectAll('.ATIT')
    .data(XTITLE)
    .enter()
    .append('g')
    .attr('class', (i) => `TITLE${i+1}`)
    .attr("transform", function (d, i) {
      return "translate(" + 13 + "," + (EH / 2 + EH * i) + ")"; 
  });
    
  TT.append("text")
    .style("text-anchor", "begin")
      .style("font", "20px sans-serif")
      .style("color", 'black')
      .style("font-weight", 400)
      .text(function (d) {
        return d.name;
      });
    }
  
  var Csvg = svg.append('g')
      .attr('class' , 'ALLCIRCLE')
  //弹框TS圆环设计
  for (var Irow = 0; Irow < ALLTSData.length; Irow++){
    for (var Icloumn = 1; Icloumn < ALLTSData[0].TSVClip.length; Icloumn++){
      var diameter = d3.min([EW, EH]) + 20
      var TSSVG = Csvg.append('g')
        .attr('class', `TS${Irow}-${Icloumn}`)
        .attr(
          'transform',
          'translate(' +
            (diameter / 5 + EW * (0.5 + Icloumn - 1)) +
            ',' +
            (diameter / 5 + EH * (Irow))+
            ')'
        )
        .style('width', EW)
      
     
      const wheel = new WeatherWheel(TSSVG) //svg画布作为参数
          .size([diameter, diameter])
          .data(ALLTSData[Irow].TSVClip[Icloumn].TSData)
          .render()
    }
  }

  
}

var TSALLRiver = (connt) =>{
  var XTITLE = []
  if (connt == 1) {
    const width = $('.circle-down').width()
    const heigh = $('.circle-down').height() 
    var EH = heigh / 3
    var EW = width / 3
    var svg = d3.select('.TSRiver-ALL')
      .attr('width', width + EW * 2.5)
      .attr('height', heigh)
      
    // 每一行的高度坐标位置比例尺
    const DegreeH = d3.scaleOrdinal()
      .domain(['Simple','Interim','Difficult'])
      .range([EH * 0,EH * 1,EH * 2]);

    var EVideo = d3.scaleOrdinal()
      .domain(['V0','V1','V2','V3','V4','V5'])
      .range([EW * 0,EW * 0.5,EW * 1.5,EW * 2.5,EW * 3.5,EW * 4.5]);
    
    
    var TSV = svg.append('g')
      .attr('class', 'AllTSV')
    
    var TST = svg.append('g')
      .attr('class',"Title")
    
    var TSClip = TSV.selectAll('.ATSV')
      .data(ALLTSData)
      .enter()
      .append('g')
      .attr('class', (i) => `Degree${i+1}`)
      .attr("transform", function (d) {
        return "translate(" + 0 + "," + (DegreeH(d.Degree)) + ")"; 
    });
    
    var ETSC = TSClip.selectAll('.ATSV')
      .data(function (d) {
        return d.TSVClip
      })
      .enter()
      .append('g')
      .attr('class', (i) =>  `TSClip${i + 1}`)
    
    ETSC.append('rect')
      .attr('x', function (d) {
      return EVideo(d.clip)
      })
      .attr('width', function (d) {
        if (d.clip == 'V0') {
          XTITLE.push(d)
          return EW / 2
        }
        else{return EW}
      })
      .attr('height', EH)
      .style("stroke", "#87CEEB")
      .style("stroke-width","1px")
      .style("fill", "none");


    var TT = TST.selectAll('.ATIT')
    .data(XTITLE)
    .enter()
    .append('g')
    .attr('class', (i) => `TITLE${i+1}`)
    .attr("transform", function (d, i) {
      return "translate(" + 13 + "," + (EH / 2 + EH * i) + ")"; 
  });
    
  TT.append("text")
    .style("text-anchor", "begin")
      .style("font", "20px sans-serif")
      .style("color", 'black')
      .style("font-weight", 400)
      .text(function (d) {
        return d.name;
      });
    }
  
  var Csvg = svg.append('g')
    .attr('class', 'ALLCIRCLE')
  
   //弹框TS圆环设计
   for (var Irow = 0; Irow < ALLRiver.length; Irow++){
    for (var Icloumn = 1; Icloumn < ALLRiver[0].TSVClip.length; Icloumn++){
      var TSSVG = Csvg.append('g')
        .attr('class', `TS${Irow}-${Icloumn}`)
        .attr(
          'transform',
          'translate(' +
            ( EW * (0.5 + Icloumn - 1)) +
            ',' +
            ( EH * (Irow))+
            ')'
        )
        .style('width', EW)
      .style('height', EH)
      
     
      const TRiver = new River(TSSVG) //svg画布作为参数
        .data(ALLRiver[Irow].TSVClip[Icloumn].RD)
        .size([EW, EH])
          .render()
    }
  }   


  
}

// ring & river切换
var TabChange = () => {
  const width = $('.Divider').width()
  const height = $('.Divider').height()

  var count = 0

  var svg = d3.select(".Tab")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "Tab")

  //中间数字线
  svg
  .append('line')
  .attr('x1', width * 0.5)
  .attr('y1', height * 0.15)
  .attr('x2', width * 0.5)
  .attr('y2', height * 0.75)
  .attr('stroke', 'black')
    .attr('stroke-width', 2)
  // .attr('stroke-dasharray', '1,2,1,2')/

  svg
    .append('text')
    .attr('x', width * 0.18)
    .attr('y', height / 2)
    .text('Ring')
    .attr('font-size', 18)
    .attr('fill', 'red')
    .attr("class", "TabRing")
    .on('click', function (d, i) {
      d3.select('.TabRing')
        .style('fill', 'red')
      
      d3.select('.TabRiver')
        .style('fill', 'black')
      
      d3.select('.TSCircle-ALL')
        .style('opacity', '1')
      
      d3.select('.TSRiver-ALL')
        .style('opacity', '0')
        .style('margin-top', '-100%')
      // .style('height', '105%')

    })
  
  svg
    .append('text')
    .attr('x', width * 0.52)
    .attr('y', height / 2)
    .text('River')
    .attr('font-size', 18)
    .attr("class", "TabRiver")
    .on('click', function (d, i) {
      d3.select('.TabRing')
        .style('fill', 'black')
      
      d3.select('.TabRiver')
        .style('fill', 'red')
      
      d3.select('.TSCircle-ALL')
        .style('opacity', '0')
      
      d3.select('.TSRiver-ALL')
        .style('opacity', '1')
        .style('margin-top', '-100%')
        .style('height', '105%')
      
      // 显示每一个课程教师情感与学生行为
      count = count + 1
      TSALLRiver(count)

    })
}
  
TabChange()



