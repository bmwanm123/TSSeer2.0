import { clickdata, faceProbability1, faceProdata11, stu1Head_pitch1, stu1Head_yaw1, TeacherPitch, Teachertem } from "../data/LVData/DV.js"
//教师情感
var TeacherEmo = () => {
  const width1 = $('.Teacher').width()
  const height1 = $('.Teacher').height()
  const width = width1 * 0.96
  const height = height1 * 0.93

  var svg = d3.select('.TEmo')
    .attr('width', width1)
    .attr('height', height1)

  //教师情感Bar
  var gBar = svg
    .append('g')
    .attr('class', 'EmoBar')
    .style('width', width)
    .style('height', height)
    .attr(
      'transform',
      'translate(' + width * 0.01 + ',' + height * 0.0 + ')'
    )
  var x = d3.scaleBand().rangeRound([width * 0.01, width1])
  // .paddingInner(0.0001)
  // .align(0.1);

  var barY = d3.scaleLinear().rangeRound([height * 0.47, 0])

  var data = Teachertem;
  var keys = ['a', 'b', 'c']
  data.sort(function(a, b) {
    return b.total - a.total
  })

  x.domain(
    data.map(function(d) {
      return d.state
    })
  )
  barY
    .domain([
      0,
      d3.max(data, function(d) {
        return d.total
      })
    ])
    .nice()

  let tt = d3.stack().keys(keys)(data)
  gBar
    .append('g')
    .selectAll('g')
    .data(tt)
    .enter()
    .append('g')
    .selectAll('rect')
    .data(function(d) {
      return d
    })
    .enter()
    .append('rect')
    .style('cursor', 'pointer')
    .on('mouseover', ev =>
      d3
        .select(ev.currentTarget)
        .attr('fill', 'black')
        .attr('fill-opacity', 0.5)
    )
    .on('mouseleave', (ev, d) =>
      d3
        .select(ev.currentTarget)
        .attr('fill', function() {
          if (d[0] == 0) {
            return d.data.colors['a']
          }
          if (d[0] == 1) {
            return d.data.colors['b']
          }
          if (d[0] == 2) {
            return d.data.colors['c']
          }
        })
        .attr('fill-opacity', 1)
    )
    .attr('fill', function(d) {
      if (d[0] == 0) {
        return d.data.colors['a']
      }
      if (d[0] == 1) {
        return d.data.colors['b']
      }
      if (d[0] == 2) {
        return d.data.colors['c']
      }
    })
    .attr('x', function(d) {
      return x(d.data.state)
    })
    .attr('y', function(d) {
      return barY(d[1])
    })
    .attr('height', function(d) {
      return barY(d[0]) - barY(d[1] + 0.05)
    })
    .attr('width', x.bandwidth() + 1)

  //教师情感Bar结束

  //教师音高信息变化

  var x = d3.scaleLinear().rangeRound([width * 0.04, width + 20]) //时间比例尺
  var x1 = d3.scaleLinear().rangeRound([width * 0.04, width]) //时间比例尺

  var y = d3.scaleLinear().rangeRound([height * 0.87, height * 0.5])

  var lineX = [],
    lineY = []
  var line = d3
    .line()
    .curve(d3.curveStepAfter)
    .x(function(d) {
      lineX.push(x(parseInt(d.name)))
      return x(parseInt(d.name) * 3.72)
    })
    .y(function(d) {
      lineY.push(y(parseInt(d.pitch)))
      return y(parseInt(d.pitch))
    })

  var data = []

  for (var i = 0; i < TeacherPitch.length; i++) {
    TeacherPitch[i].name = parseInt(TeacherPitch[i].name)
    TeacherPitch[i].pitch = parseInt(TeacherPitch[i].pitch)
    data.push(TeacherPitch[i])
  }

  x.domain(
    d3.extent(data, function(d) {
      return d.name * 3.72
    })
  )
  x1.domain(
    d3.extent(data, function(d) {
      return d.name * 3.72
    })
  )
  y.domain(
    d3.extent(data, function(d) {
      return d.pitch
    })
  )

  //横坐标轴
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height * 0.87 + ')')
    .call(d3.axisBottom(x1))
    .select('.domain')
    .remove()

  //纵坐标轴
  svg
    .append('rect')
    .attr('transform', 'translate(' + 0 + ',' + height * 0.12 + ')')
    .attr('fill', '#FFDEAD')
    .attr('x', function() {
      return -6
    })
    .attr('y', function() {
      return -20
    })
    .attr('height', function(d) {
      return height
    })
    .attr('width', width * 0.03)

  svg
    .append('text')
    .attr('x', 1)
    .attr('y', height * 0.1)
    .text('Bar')
    .attr('font-size', 12)

  svg
    .append('text')
    .attr('x', 1)
    .attr('y', height * 0.8)
    .text('Pitch')
    .attr('font-size', 12)

  //纵坐标轴
  // svg
  //   .append('g')
  //   .attr(
  //     'transform',
  //     'translate(' + width * 0.02 + ',' + height * 0.13 + ')'
  //   )
  //   .call(d3.axisLeft(y))
  //   .append('text')
  //   .attr('fill', '#000')
  //   .attr('transform', 'rotate(-90)')

  //折线
  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 0.5)
    .attr('d', line)
}
// 学生YAW
var SYaw = () => {
  const width1 = $('.Stu-up').width()
  const height1 = $('.Stu-up').height()
  const width = width1 * 0.96
  const height = height1 * 0.93
  console.log(width, height)
  var margin = { top: 20, right: 20, bottom: 20, left: 20 }
  var svg = d3.select('.YYaw')
  .attr('width', width1)
  .attr('height', height1)
   

  svg = svg
    .append('g')
    .attr('class', 'TSDetailMain')
    .style('width', width)
    .style('height', height)
    .attr(
      'transform',
      'translate(' + width * 0.01 + ',' + height * 0.01 + ')'
    )

  var parseTime = d3.timeParse('%d-%b-%y')

  var x = d3.scaleLinear().rangeRound([width * 0.04, width]) //时间比例尺

  var y = d3.scaleLinear().rangeRound([height * 0.87, 0])

  var lineX = [],
    lineY = []
  var line = d3
    .line()
    .curve(d3.curveStepAfter)
    .x(function(d) {
      lineX.push(x(parseInt(d.name)))
      // return x(parseInt(d.name))
      return x(parseInt(d.name) * 1.18)
    })
    .y(function(d) {
      lineY.push(y(parseInt(d.yaw)))
      return y(parseInt(d.yaw))
    })


  var data = []
  for (var i = 0; i < stu1Head_yaw1.length; i++) {
    stu1Head_yaw1[i].name = parseInt(stu1Head_yaw1[i].name)
    stu1Head_yaw1[i].yaw = parseInt(stu1Head_yaw1[i].yaw)
    data.push(stu1Head_yaw1[i])
  }
  x.domain(
    d3.extent(data, function(d) {
      //返回最大、最小值
      // return d.date
      // return d.name
      return d.name * 1.18
    })
  )
  y.domain(
    d3.extent(data, function(d) {
      // return d.close
      return d.yaw
    })
  )
  //横坐标轴
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height * 0.9 + ')')
    .call(d3.axisBottom(x))
    .select('.domain')
    .remove()

  //纵坐标轴
  svg
    .append('rect')
    .attr('transform', 'translate(' + -3 + ',' + height * 0.12 + ')')
    .attr('fill', '#FFDEAD')
    .attr('x', function() {
      return -8
    })
    .attr('y', function() {
      return -20
    })
    .attr('height', function(d) {
      return height + 8
    })
    .attr('width', width * 0.025)

  svg
    .append('rect')
    .attr('transform', 'translate(' + 0 + ',' + height * 0.13 + ')')
    .attr('fill', '#F5F5F5')
    .attr('x', function() {
      return width * 0.02
    })
    .attr('y', function() {
      return -20
    })
    .attr('height', function(d) {
      return height * 0.11
    })
    .attr('width', width * 0.06)
  svg
    .append('text')
    .attr('x', width * 0.025)
    .attr('y', height * 0.08)
    .text('Y/Yaw')
    .attr('font-size', 13)

  //中间数字线
  svg
    .append('line')
    .attr('x1', -10)
    .attr('y1', height / 2)
    .attr('x2', width * 0.015)
    .attr('y2', height / 2)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.8)
    .attr('stroke-dasharray', '1,2,1,2')

  svg
    .append('text')
    .attr('x', -2)
    .attr('y', height / 2)
    .text('0')
    .attr('font-size', 12)

  //下方数字线
  svg
    .append('line')
    .attr('x1', -10)
    .attr('y1', height)
    .attr('x2', width * 0.015)
    .attr('y2', height)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.8)
    .attr('stroke-dasharray', '1,2,1,2')

  svg
    .append('text')
    .attr('x', -2)
    .attr('y', height)
    .text('-1')
    .attr('font-size', 12)

  // //上方数字线
  svg
    .append('line')
    .attr('x1', -10)
    .attr('y1', 0)
    .attr('x2', width * 0.015)
    .attr('y2', 0)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.8)
    .attr('stroke-dasharray', '1,2,1,2')

  svg
    .append('text')
    .attr('x', -2)
    .attr('y', 10)
    .text('1')
    .attr('font-size', 12)

  //折线
  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 0.5)
    .attr('d', line)

  // 表情概率柱状图
  var y_face = d3 //整体高度
    .scaleOrdinal()
    .domain(['X-Yaw'])
    .range([0, height * 0.87])
  // .rangeRoundBands([0, height], 0.15, 0)

  var y1 = d3 //算法概率比例尺
    .scaleLinear()
    .domain([0, 98])
    .range([height * 0.08, 0])

  var x_face = d3 //概率图横坐标
    .scaleOrdinal()
    // .domain(d3.range(9))
    .domain(d3.range(data.length))
    .range([0, width], 0.1)

  // var xAxis = d3.svgAxis()
  //   .scale(x_face)
  //   .orient('bottom')

  var multiple = svg
    .selectAll('.multiple')
    .attr('width', width)
    .attr('height', height)
    .data(
      y_face.domain().map(function(d) {
        return { name: d }
      })
    )
    .enter()
    .append('g')
    .attr('class', 'multiple')
    .attr('transform', function(d) {
      return 'translate(3.5,' + y_face(d.name) + ')'
    })

  // var facedata = faceProbability
  var facedata = []
  // for (var i = 0; i < faceProdata.length; i++) {
  //   faceProdata[i].emotionlabel = faceProdata[i].emotionlabel
  //   faceProdata[i].percentage = parseFloat(faceProdata[i].percentage)
  //   facedata.push(faceProdata[i])

  //   // var key = i;
  //   // var value = faceProdata[i].percentage;
  //   // pcenD[key] = value;
  // }
  for (var i = 0; i < faceProdata11.length; i++) {
    faceProdata11[i].emotionlabel = faceProdata11[i].emotionlabel
    faceProdata11[i].percentage = parseFloat(faceProdata11[i].percentage)
    facedata.push(faceProdata11[i])
  }

  var faceColors = {
    anger: '#EE6363',
    disgust: '#9370DB',
    fear: '#B4EEB4',
    happiness: '#FFD700',
    neutral: '#CFCFCF',
    sadness: '#66CDAA',
    surprise: '#5CACEE'
  }

  var pcenD = faceProbability1
  //概率线条
  var yAxis = d3
    .axisLeft(y1)
    .scale(y1)
    .ticks(4, '%')

  multiple
    .data(pcenD, function(d) {
      return d.name
    })
    .selectAll('rect')
    .data(function(d) {
      return x_face.domain().map(function(i) {
        return { key: i, value: +d[i] }
      })
    })
    .enter()
    .insert('rect', '*')
    .style('cursor', 'pointer')
    .on('mouseover', function(ev, d) {
      d3.select(ev.currentTarget)
        .attr('width', 10)
        .attr('height', 30)

      // console.log(d.key)
      svg
        .append('text')
        .classed('tip', true)
        .attr('x', lineX[parseInt(d.key)] * 1.18 - 1.5)
        .attr('y', lineY[parseInt(d.key)] + 15)
        .attr('fill', 'black')
        .text(facedata[d.key].emotionlabel)

      // console.log(stu1Head_yaw1)
      svg
        .append('text')
        .classed('tip1', true)
        .attr('x', lineX[parseInt(d.key)] * 1.18 + 10.5)
        .attr('y', lineY[parseInt(d.key)] + 30)
        .attr('fill', 'black')
        .text(`${stu1Head_yaw1[parseInt(d.key)].yaw}°`)
    })
    .on('mouseleave', function(ev, d) {
      d3.select(ev.currentTarget)
        .attr('width', width / data.length - 0.8)
        .attr('height', function(d) {
          return (y1(0) - y1(d.value)) / 2
        })
        .attr('fill-opacity', 1)
      d3.select('.tip').remove()
      d3.select('.tip1').remove()
    })
    .on('click', (e, d) => {
      if (d.key == 155) {
        this.IsShot = true
        Emitter.emit('getShot', this.IsShot) //选中某一link后触发
      }
      console.log(this.IsShot)
    })
    //鼠标结束
    .attr('width', width / data.length - 0.8)
    // .attr('width', x_face.rangeBand())
    .style('fill', function(d) {
      return faceColors[facedata[d.key].emotionlabel]
    })
    .attr('x', function(d) {
      // console.log(d, lineX)
      return lineX[parseInt(d.key)] * 1.18 - 9.5
      // return lineX[parseInt(d.key)] + 0.8
    })
    .attr('y', function(d) {
      return lineY[parseInt(d.key)] + 1
    })
    .attr('height', function(d) {
      return (y1(0) - y1(d.value)) / 2
    })

  // for (var item = 0; item < data.length; item++) {
  // svg
  //   .append('g')
  //   .attr('class', 'axis axis--y axis--y-inside')
  //   // .data(pcenD, function(d) {
  //   //   return x_face.domain().map(function(i) {
  //   //     return { key: i, value: +d[i] }
  //   //   })
  //   // })
  //   // .attr('width', width / data.length - 0.1)
  //   .attr('transform', function(d, i) {
  //     // console.log(item)
  //     return (
  //       'translate(' + lineX[parseInt(2)] + ',' + lineY[parseInt(2)] + ')'
  //     ) //返回圆心坐标
  //   })
  //   .call(yAxis(pcenD[2]).tickSize(-(width / data.length - 0.1)))
  // }
}
// 学生点击流
var SClick = () => {
  const width1 = $('.Stu-mid').width()
  const height1 = $('.Stu-mid').height()
  const width = width1 * 0.96
  const height = height1 * 0.99
  var svg = d3.select('.clickEvent')
  .attr('width', width1)
    .attr('height', height1)
    

  svg = svg.append('g').attr('class', 'EventMain')
  // .style('width', width)
  // .style('height', height)
  // .attr(
  //   'transform',
  //   'translate(' + width * 0.01 + ',' + height * 0.01 + ')'
  // )

  //直线串
  svg
    .append('line')
    .attr('x1', width * 0.05)
    .attr('y1', height / 2)
    .attr('x2', width + 16)
    .attr('y2', height / 2)
    .attr('stroke', '#9C9C9C')
    .attr('stroke-width', '1.5px')

  //纵坐标
  svg
    .append('rect')
    .attr('transform', 'translate(' + -1 + ',' + height * 0.2 + ')')
    .attr('fill', '#FFDEAD')
    .attr('x', function() {
      // return -8
      return 0
    })
    .attr('y', function() {
      return -20
    })
    .attr('height', function(d) {
      return height + 9
    })
    // .attr('width', width * 0.035)
    .attr('width', width * 0.025)

  svg
    .append('line')
    .attr('x1', -10)
    .attr('y1', height * 0.95)
    .attr('x2', width * 0.028)
    .attr('y2', height * 0.95)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.8)
    .attr('stroke-dasharray', '1,2,1,2')

  svg
    .append('text')
    .attr('x', 7)
    .attr('y', height * 0.95)
    .text('1')
    .attr('font-size', 12)

  svg
    .append('rect')
    .attr('transform', 'translate(' + 0 + ',' + height * 0.28 + ')')
    .attr('fill', '#F5F5F5')
    .attr('x', function() {
      return width * 0.03
    })
    .attr('y', function() {
      return -20
    })
    .attr('height', function(d) {
      return height * 0.17
    })
    .attr('width', width * 0.1)
  svg
    .append('text')
    .attr('x', width * 0.038)
    .attr('y', height * 0.19)
    .text('Mouse Click')
    .attr('font-size', 13)

  //点击元素
  //圆

  var data = []
  for (var i = 0; i < clickdata.length; i++) {
    clickdata[i].time = parseInt(clickdata[i].time)
    clickdata[i].time1 = parseInt(clickdata[i].time1)
    clickdata[i].name = clickdata[i].name
    data.push(clickdata[i])
  }
  var x = d3.scaleLinear().rangeRound([width * 0.04, width]) //时间比例尺

  x.domain(
    d3.extent(data, function(d) {
      return d.time
    })
  )

  var R = height / 12
  var clickColors = {
    play: '#8DEEEE',
    pause: '#EEAD0E',
    seekforward: '#E6E6FA',
    seekback: '#FFE4E1',
    ratechange: '#ADD8E6',
    volumechange: '#CDB38B',
    ratechange1: 'none'
  }
  // for (var i = 0; i < 18; i++) {
  //   var cx = margin.left + i * (2 * R + R)
  //   var cy = height / 2

  //   svg
  //     .append('svg:circle')
  //     .classed('wcircle', true)
  //     .attr('cx', cx)
  //     .attr('cy', cy)
  //     .attr('r', R) //第一个圆半径
  //     // .style('fill', 'none')
  //     .style('fill', '#2ca02c')
  //     .style('stroke', '#2ca02c')
  //     .style('stroke-width', '1px')
  // }
  for (var item = 0; item < data.length; item++) {
    if (item <= 17) {
      svg
        .append('svg:circle')
        .classed('wcircle', true)
        .attr('transform', function() {
          return 'translate(' + width * 0.015 + ',' + 0 + ')' //返回圆心坐标
        })
        .attr('cx', function() {
          return x(data[item].time)
        })
        .attr('cy', function(d, i) {
          return height / 2
        })
        .attr('r', R) //第一个圆半径
        // .style('fill', 'none')
        .style('fill', function() {
          return clickColors[data[item].name]
        })
      // .style('stroke', '#2ca02c')
      // .style('stroke-width', '1px')
      if (item == 6) {
        svg
          .append('rect')
          // .attr('x', x(data[6].time) + 1.5 * R)
          .attr('x', x(data[6].time) + 2 * R + 1)
          .attr('y', height / 2 - R)
          .attr('width', x(225) - x(data[6].time) - 2 * R)
          .attr('height', 2 * R)
          .attr('fill', clickColors[data[item].name])

        //右半圆
        var arc1 = d3
          .arc()
          .innerRadius(0)
          .outerRadius(R)
          .startAngle(0 * Math.PI)
          .endAngle((2 / 2) * Math.PI)
        svg
          .append('path')
          .attr('class', 'arc')
          .attr('d', arc1)
          .attr('fill', clickColors[data[item].name])
          .attr(
            'transform',
            'translate(' + (x(203) + 4 * R - 1) + ',' + height / 2 + ')'
            // 'translate(' + (x(203) + 2 * R - 1) + ',' + height / 2 + ')'
          )

        //三角形
        svg
          .append('path')
          .attr('d', 'M-22,-30 l 60,30 l -60,30 z')
          .attr(
            'transform',
            'translate(' +
              (x(data[6].time) + 2 * R + 4) +
              ',' +
              (height / 2 - 2 * R - 3) +
              ')scale(.2)'
          )
          .attr('fill', '#FFB90F')
      }
      if (item == 5) {
        svg
          .append('rect')
          // .attr('x', x(data[5].time) - 2 * R)
          .attr('x', x(data[5].time) - 4 * R)
          .attr('y', height / 2 - R)
          .attr('width', x(data[5].time) - x(200) - R)
          .attr('height', 2 * R)
          .attr('fill', '#FFE4E1')

        //左半圆
        var arc1 = d3
          .arc()
          .innerRadius(0)
          .outerRadius(R)
          .startAngle(1 * Math.PI)
          .endAngle((4 / 2) * Math.PI)
        svg
          .append('path')
          .attr('class', 'arc')
          .attr('d', arc1)
          .attr('fill', '#FFE4E1')
          .attr(
            'transform',
            'translate(' + (x(200) + 6 * R + 11) + ',' + height / 2 + ')'
            // 'translate(' + (x(200) + 5 * R + 5) + ',' + height / 2 + ')'
          )

        //右半圆
        var arc = d3
          .arc()
          .innerRadius(0)
          .outerRadius(R)
          .startAngle(0 * Math.PI)
          .endAngle((2 / 2) * Math.PI)

        svg
          .append('path')
          .attr('class', 'arc')
          .attr('d', arc)
          .attr('fill', '#FFE4E1')
          // .attr('fill', 'red')
          .attr(
            'transform',
            'translate(' +
              (x(data[5].time) + 6 * R - 1) +
              ',' +
              height / 2 +
              ')'
          )

        //三角形
        svg
          .append('path')
          .attr('d', 'M-22,-30 l -60,30 l 60,30 z')
          .attr(
            'transform',
            'translate(' +
              (x(data[5].time) + 7 * R) +
              ',' +
              (height / 2 - 2 * R - 3) +
              ')scale(.2)'
          )
          .attr('fill', '#FFB90F')
      }
      if (item == 9) {
        svg
          .append('rect')
          .attr('x', x(data[9].time) + 5 * R + 2)
          .attr('y', height / 2 - R)
          .attr('width', x(data[9].time) - x(305))
          .attr('height', 2 * R)
          .attr('fill', '#FFE4E1')
        // .attr('fill', 'red')

        //左半圆
        var arc1 = d3
          .arc()
          .innerRadius(0)
          .outerRadius(R)
          .startAngle(1 * Math.PI)
          .endAngle((4 / 2) * Math.PI)
        svg
          .append('path')
          .attr('class', 'arc')
          .attr('d', arc1)
          .attr('fill', '#FFE4E1')
          .attr(
            'transform',
            // 'translate(' + (x(310) + 7 * R + 1) + ',' + height / 2 + ')'
            'translate(' + (x(310) + 10 * R - 1.5) + ',' + height / 2 + ')'
          )

        //右半圆
        var arc = d3
          .arc()
          .innerRadius(0)
          .outerRadius(R)
          .startAngle(0 * Math.PI)
          .endAngle((2 / 2) * Math.PI)

        svg
          .append('path')
          .attr('class', 'arc')
          .attr('d', arc)
          .attr('fill', '#FFE4E1')
          .attr(
            'transform',
            'translate(' +
              (x(data[9].time) + 11 * R - 6) +
              ',' +
              height / 2 +
              ')'
          )

        //三角形
        svg
          .append('path')
          .attr('d', 'M-22,-30 l -60,30 l 60,30 z')
          .attr(
            'transform',
            'translate(' +
              (x(data[9].time) + 11 * R + 3) +
              ',' +
              (height / 2 - 2 * R - 3) +
              ')scale(.2)'
          )
          .attr('fill', '#FFB90F')
      }
      if (item == 15) {
        svg
          .append('rect')
          .attr('x', x(data[15].time) + 2 * R + 3)
          .attr('y', height / 2 - R)
          .attr('width', x(530) - x(data[14].time) + 5)
          .attr('height', 2 * R)
          .attr('fill', '#FFE4E1')

        //右半圆
        var arc1 = d3
          .arc()
          .innerRadius(0)
          .outerRadius(R)
          .startAngle(0 * Math.PI)
          .endAngle((2 / 2) * Math.PI)
        svg
          .append('path')
          .attr('class', 'arc')
          .attr('d', arc1)
          .attr('fill', '#FFE4E1')
          .attr(
            'transform',
            'translate(' + (x(550) + 3 * R - 2) + ',' + height / 2 + ')'
          )

        //三角形
        svg
          .append('path')
          .attr('d', 'M-22,-30 l -60,30 l 60,30 z')
          .attr(
            'transform',
            'translate(' +
              (x(data[15].time) + 12 * R - 3) +
              ',' +
              (height / 2 - 2 * R - 3) +
              ')scale(.2)'
          )
          .attr('fill', '#FFB90F')
      }
      if (item == 16) {
        svg
          .append('rect')
          .attr('x', x(data[16].time) + 6)
          .attr('y', height / 2 - R)
          .attr('width', x(785) - x(data[16].time) + 5 + R)
          .attr('height', 2 * R)
          .attr('fill', '#E6E6FA')

        //左半圆
        var arc1 = d3
          .arc()
          .innerRadius(0)
          .outerRadius(R)
          .startAngle(1 * Math.PI)
          .endAngle((4 / 2) * Math.PI)
        svg
          .append('path')
          .attr('class', 'arc')
          .attr('d', arc1)
          .attr('fill', '#E6E6FA')
          .attr('transform', 'translate(' + x(711) + ',' + height / 2 + ')')

        //三角形
        svg
          .append('path')
          // .attr('d', 'M-22,-30 l -60,30 l 60,30 z')
          .attr('d', 'M-22,-30 l 60,30 l -60,30 z')
          .attr(
            'transform',
            'translate(' +
              x(711) +
              ',' +
              (height / 2 - 2 * R - 3) +
              ')scale(.2)'
          )
          .attr('fill', '#FFB90F')
      }
    }

    if (item > 19) {
      svg
        .append('svg:circle')
        .classed('wcircle', true)
        .attr('transform', function() {
          return 'translate(' + width * 0.015 + ',' + 0 + ')' //返回圆心坐标
        })
        .attr('cx', function() {
          return x(data[item].time)
        })
        .attr('cy', function(d, i) {
          return height / 2
        })
        .attr('r', R * 0.35) //第一个圆半径
        // .style('fill', 'none')
        .style('fill', function() {
          return '#696969'
        })
    } else {
    }
  }
}
// 学生Pitch
var SPith = () => {
  const width1 = $('.Stu-down').width()
  const height1 = $('.Stu-down').height()
  const width = width1 * 0.96
  const height = height1 * 0.93
  console.log(width1, height1)
  var margin = { top: 20, right: 20, bottom: 20, left: 20 }
  var svg = d3.select('.XPitch')
  .attr('width', width1)
    .attr('height', height1)
 

  svg = svg
    .append('g')
    .attr('class', 'TSDetailMain')
    .style('width', width)
    .style('height', height)
    .attr(
      'transform',
      'translate(' + width * 0.01 + ',' + height * 0.01 + ')'
    )

  var parseTime = d3.timeParse('%d-%b-%y')

  var x = d3.scaleLinear().rangeRound([width * 0.04, width]) //时间比例尺

  var y = d3.scaleLinear().rangeRound([height * 0.87, 0])

  var lineX = [],
    lineY = []
  var line = d3
    .line()
    .curve(d3.curveStepAfter)
    .x(function(d) {
      lineX.push(x(parseInt(d.name)))
      return x(parseInt(d.name) * 1.18)
    })
    .y(function(d) {
      lineY.push(y(parseInt(d.pitch)))
      return y(parseInt(d.pitch))
    })


  var data = []
  // for (var i = 0; i < stu1Head_pitch.length; i++) {
  //   stu1Head_pitch[i].name = parseInt(stu1Head_pitch[i].name)
  //   stu1Head_pitch[i].pitch = parseInt(stu1Head_pitch[i].pitch)
  //   data.push(stu1Head_pitch[i])
  // }
  for (var i = 0; i < stu1Head_pitch1.length; i++) {
    stu1Head_pitch1[i].name = parseInt(stu1Head_pitch1[i].name)
    stu1Head_pitch1[i].pitch = parseInt(stu1Head_pitch1[i].pitch)
    data.push(stu1Head_pitch1[i])
  }
  x.domain(
    d3.extent(data, function(d) {
      return d.name * 1.18
    })
  )
  y.domain(
    d3.extent(data, function(d) {
      return d.pitch
    })
  )

  //横坐标轴
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height * 0.9 + ')')
    .call(d3.axisBottom(x))
    .select('.domain')
    .remove()

  svg
    .append('rect')
    .attr('transform', 'translate(' + -3 + ',' + height * 0.12 + ')')
    .attr('fill', '#FFDEAD')
    .attr('x', function() {
      return -8
    })
    .attr('y', function() {
      return -20
    })
    .attr('height', function(d) {
      return height + 8
    })
    .attr('width', width * 0.025)

  svg
    .append('rect')
    .attr('transform', 'translate(' + 0 + ',' + height * 0.13 + ')')
    .attr('fill', '#F5F5F5')
    .attr('x', function() {
      return width * 0.02
      // return width * 0.22
    })
    .attr('y', function() {
      return -20
    })
    .attr('height', function(d) {
      return height * 0.11
    })
    .attr('width', width * 0.06)
  svg
    .append('text')
    .attr('x', width * 0.025)
    .attr('y', height * 0.08)
    .text('X/Pitch')
    // .text('student_happy')
    // .attr('dy', 6)
    // .attr('font-size', 14)
    .attr('font-size', 13)

  //中间数字线
  svg
    .append('line')
    .attr('x1', -10)
    .attr('y1', height / 2 - 10)
    .attr('x2', width * 0.015)
    .attr('y2', height / 2 - 10)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.8)
    .attr('stroke-dasharray', '1,2,1,2')

  svg
    .append('text')
    .attr('x', -2)
    .attr('y', height / 2 - 10)
    .text('0')
    .attr('font-size', 12)

  //下方数字线
  svg
    .append('line')
    .attr('x1', -10)
    .attr('y1', height - 10)
    .attr('x2', width * 0.015)
    .attr('y2', height - 10)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.8)
    .attr('stroke-dasharray', '1,2,1,2')

  svg
    .append('text')
    .attr('x', -2)
    .attr('y', height - 10)
    .text('-1')
    .attr('font-size', 12)

  //折线
  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 0.5)
    .attr('d', line)
}
var DetailMethod = () => {
  TeacherEmo()
  SYaw()
  SClick()
  SPith()
}



export { DetailMethod }

