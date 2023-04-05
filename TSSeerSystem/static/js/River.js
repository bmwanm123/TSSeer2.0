export class River {
  constructor(container) {
    this._container = container
    this._g = null;
    this._data = null;
    this._width = null;
    this._height = null;
  }

  data(_) {
    return arguments.length ? ((this._data = _), this) : this._data;
  }
  size(_) {
    return arguments.length
      ? ((this._width = _[0]), (this._height = _[1]), this)
      : [this._width, this._height];
  }

  render() {
    this._g = this._container
    this._init()
  }

  _init() {
    var width = this._width
    var height = this._height
    var dataset = this._data
    var XLen = dataset[0].length
      var stack = d3.stack()(dataset)
      var xScale = d3
        .scaleLinear()
        .domain([0, XLen])
        .range([12, width -10])

      var maxHeight = d3.max(dataset, function(d) {
        return d3.max(d, function(d) {
          return d.y0 + d.y
        })
      })
      var yScale = d3
        .scaleLinear()
        .domain([0, maxHeight])
        .range([10, height * 0.9])
      var colors = [
        '#8DEEEE',
        '#EEAD0E',
        '#E6E6FA',
        '#FFE4E1',
        '#ADD8E6',
        '#CDB38B'
      ]
      var groups = this._g
        .selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .style('fill', function(d, i) {
          return colors[i]
        })
      var area = d3
        .area()
        .curve(d3.curveBasis)
        // .interpolate('cardinal')
        .x(function(d, i) {
          return xScale(i)
        })
        .y0(function(d) {
          return height - yScale(d.y0 + d.y)
        })
        .y1(function(d) {
          return height - yScale(d.y0)
        })

      groups
        .append('path')
        .attr('d', function(d) {
          return area(d)
        })
        .style('fill', function(d, i) {
          return colors[i]
        })

      // var x = d3
      //   .scaleLinear()
      //   .domain([0, 900])
      //   .range([0, width])

      // var y = d3
      //   .scaleLinear()
      //   .domain([80, 0])
      //   .range([0, height])

      // const axisBottomLine = d3
      //   .axisBottom()
      //   .scale(x) // 使用上面定义的比例尺
      //   .ticks(2) // 指定刻度的数量,会根据当前区间做出最优分配

      // const axisLeftLine = d3
      //   .axisLeft()
      //   .scale(y) // 使用上面定义的比例尺
      //   .ticks(3) // 指定刻度的数量,会根据当前区间做出最优分配

      // //在svg中添加一个包含坐标轴各元素的g元素
      // const gAxis = this._g
      //   .append('g')
      //   .attr('transform', 'translate(' + 20 + ',' + height * 1.01 + ')') //平移到(30,10)
      //   .attr('class', 'axis')
      //   .attr('fill', '#CFCFCF')

      // const gAxis1 = this._g
      //   .append('g')
      //   .attr('transform', 'translate(' + 20 + ',' + height * 0 + ')') //平移到(30,10)

      //   .attr('class', 'axis')

      // axisBottomLine(gAxis)
      // axisLeftLine(gAxis1)
      // this._g
      //   .append('text')
      //   .attr('x', width * 0.94)
      //   .attr('y', height * 1.06)
      //   .text('900(s)')
      //   .attr('font-size', 10)
  }
}