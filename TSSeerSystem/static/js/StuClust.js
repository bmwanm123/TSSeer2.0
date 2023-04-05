import { StuClusterD } from '../data/LVData/SV.js'
import { Gauge } from './gauge.js'

//找出概率、yaw的最大最小值
 var percen = [],
  yaw = []
var X = [],
  Y = []
 
var ClusterR = (Vid, Tid) => {
  var StuD = FindItem(Vid, Tid)
  console.log(Vid, Tid, StuD)

  for (var i = 0; i < StuD.Stu2Clust.length; i++) {
    percen.push(parseFloat(StuD.Stu2Clust[i].percentage))
    yaw.push(parseFloat(StuD.Stu2Clust[i].yaw))
    X.push(StuD.Positon[i].PostionX)
    Y.push(StuD.Positon[i].PostionY)
  }

  for (var i = 0; i < StuD.Positon.length; i++){
    createGauge(
      'student',
      'Student',
      i,
      StuD.Positon[i].PostionX,
      StuD.Positon[i].PostionY,
      StuD.Stu2Clust[i]
    )
  }
  
}

var FindItem = (Vid, Tid) => {
  for (var item = 0; item < StuClusterD.length; item++){
    if (StuClusterD[item].VideoId == Vid && StuClusterD[item].TGroupId == Tid) {
      return StuClusterD[item]
    }
  }
}


var createGauge = (name, label, index, x, y, stuD, min, max) => {

  var PercenMin = Math.min(...percen)
  var PercenMax = Math.max(...percen)
  var YawMin = Math.min(...yaw)
  var YawMax = Math.max(...yaw)

  const width = $('.Cluster-down').width()
      const height = $('.Cluster-down').height()
      var gauges = []

      var config = {
        size: width * 0.1,
        label: label,
        min: undefined != min ? min : 0,
        max: undefined != max ? max : 100,
        Xmax: Math.max(...X), //case1
        Xmin: Math.min(...X),
        Ymax: Math.max(...Y),
        Ymin: Math.min(...Y),
        minorTicks: 5,
        index: index,
        stuX: x,
        stuY: y
      }

      //点击流数据
      config.clickdata = stuD.click

      var faceColors = {
        anger: '#EE6363',
        disgust: '#9370DB',
        fear: '#B4EEB4',
        happiness: '#FFD700',
        neutral: '#CFCFCF',
        sadness: '#66CDAA',
        surprise: '#5CACEE'
      }

      //外层表情比例尺
      var scaleFaceRange = d3
        .scaleLinear()
        .domain([PercenMin, PercenMax])
        .nice()
        .range([config.min, config.max])

      //指针比例尺 左边部分
      var scalePoint_left = d3
        .scaleLinear()
        .domain([YawMin, 0])
        .nice()
        .range([config.min, config.max * 0.5])

      //指针比例尺 右边部分
      var scalePoint_right = d3
        .scaleLinear()
        .domain([0, YawMax])
        .nice()
        .range([config.max * 0.5, config.max])

      config.PoinText = stuD.yaw
      var faceEnd = scaleFaceRange(stuD.percentage)
      var range = config.max - config.min

      if (stuD.yaw < 0) {
        config.PointAt = scalePoint_left(stuD.yaw)
      }
      if (stuD.yaw >= 0) {
        config.PointAt = scalePoint_right(stuD.yaw)
      }


      config.yellowColor = faceColors[stuD.emotionlabel]

      //内层指向环范围
      // config.yellowZones = [
      //   { from: config.min + range * 0.75, to: config.min + range * 0.9 }
      // ]
      // config.redZones = [{ from: config.min + range * 0.9, to: config.max }]
      config.yellowZones = [
        {
          from: config.PointAt - range * 0.1,
          to: config.PointAt + range * 0.05
        }
      ]
      config.redZones = [
        {
          from: config.PointAt + range * 0.05,
          to: config.PointAt + range * 0.1
        }
      ]

      //face环范围
      // config.faceZones = [{ from: config.min, to: config.min + range * 0.75 }]
      config.faceZones = [{ from: config.min, to: faceEnd }]

      gauges[name] = new Gauge(name + 'GaugeContainer', config)
      gauges[name].render()
}

export { ClusterR }

