import { headPose1, keyframe1 } from '../data/LVData/VO.js'

var PictureSlide = () => {
  const width1 = $('.slide').width()
  const height1 = $('.slide').height()
  const width = width1 * 0.96
  const height = height1 * 0.99
  console.log(width1, height1)
  var margin = { top: 20, right: 20, bottom: 20, left: 20 }
  var svg = d3.select('.slidemain')
  .attr('width', width1)
    .attr('height', height1)
    
  svg = svg
    .append('g')
    .attr('class', 'FrameMain')
    .style('width', width)
    .style('height', height1)
  // .attr(
  //   'transform',
  //   'translate(' + width * 0.01 + ',' + height * 0.01 + ')'
  // )

  var xScale = d3.scaleLinear().rangeRound([width * 0.04, width]) //时间比例尺
  var xScale_po = d3
    .scaleLinear()
    .domain([0, 21])
    .range([-12, width])
  var yScale_headPos = d3
    .scaleOrdinal()
    .range(['#118ab2', '#ef476f', '#ffd166'])
    .domain(['light', 'large', 'normal'])

  var barHeight = 15
  var barWidth = 15

  let linear = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 1])
  let red = '#'
  let compute = d3.interpolate('red', 'yellow', 'yellow')

  svg
    .selectAll('rect')
    // .data(headPose)
    .data(headPose1)
    .join('rect')
    .style('cursor', 'pointer')
    .on('mouseover', ev =>
      d3.select(ev.currentTarget).attr('fill', 'black')
    )
    .on('mouseleave', (ev, d) =>
      d3.select(ev.currentTarget).attr('fill', yScale_headPos(d.facePos))
    )
    // .on("click", (ev, d, i) => {
    //     const video = document.querySelector(".video video")
    //     // video.play()
    //     video.currentTime = Number(d.time)
    //     //document.querySelector(".video video").setAttribute("currentTime",d.time)
    // })
    .attr('x', function(d, i) {
      // console.log(d, i)
      return xScale_po(d.name)
    })
    .attr('y', margin.top * 1)
    .attr('height', barHeight)
    .attr('width', barWidth)
    .attr('fill', d => yScale_headPos(d.facePos))
  // svg
  //   .selectAll('rect')
  //   .data(d3.range(100))
  //   .enter()
  //   .append('rect')
  //   .attr('x', (d, i) => i * 2)
  //   .attr('y', 0)
  //   .attr('width', 2)
  //   .attr('height', 10)
  //   .style('fill', (d, i) => compute(linear(d)))

  //  var xScale = d3.scaleLinear(xDomain, [cfg.margin.left, cfg.w - cfg.margin.right]);

  svg
    .selectAll('image')
    // .data(keyframe)
    .data(keyframe1)
    .join('image')
    .attr('x', d => xScale(d.frame / 16) - 35)
    .attr('y', (d, i) => ((i % 3) + 1) * margin.top * 2.5)
    .attr('height', 50)
    .attr('width', 50)
    .attr('xlink:href', d => d.img)
    .attr('class', 'keyframe')
    .on('mouseover', (e, d) => {
      // console.log(d.frame)
      svg.selectAll('.line').attr('opacity', 0.1)
      svg.selectAll('.keyframe').attr('opacity', 0.1)
      d3.select(e.currentTarget).attr('opacity', 1)
      d3.selectAll(`.l${d.frame}`).attr('opacity', 1)
    })
    .on('mouseleave', e => {
      svg.selectAll('.keyframe').attr('opacity', 1)
      svg.selectAll('.line').attr('opacity', 1)
    })
    .on('click', (e, d) => {
      if (d.frame == 4) {
        this.IsPic = true
        Emitter.emit('getPic', this.IsPic) //选中某一link后触发
      }
      console.log(this.IsPic)
    })

  svg
    .selectAll('line')
    // .data(keyframe)
    .data(keyframe1)
    .join('line')
    .attr('class', d => `line l${d.frame}`)
    .attr('x1', d => xScale(d.frame / 16))
    .attr('y1', d => margin.top * 1 + barHeight)
    .attr('x2', d => xScale(d.frame / 16))
    .attr('y2', (d, i) => ((i % 3) + 1) * margin.top * 3 + 5)
    .attr('stroke', 'grey')
}

var VideoMethod = () => {
  PictureSlide()
}



export { VideoMethod }

