
export function Gauge(placeholderName, configuration) {
  this.placeholderName = placeholderName;

  var self = this; // for internal d3 functions

  this.configure = function(configuration) {
    this.config = configuration;

    // 学生坐标最大最小值
    this.config.Xmax = this.config.Xmax;
    this.config.Xmin = this.config.Xmin;
    this.config.Ymax = this.config.Ymax;
    this.config.Ymin = this.config.Ymin;
    this.config.stuX = this.config.stuX;
    this.config.stuY = this.config.stuY;

    this.config.index = this.config.index;
    this.config.size = this.config.size * 0.9;

    this.config.raduis = (this.config.size * 0.97) / 2;
    this.config.cx = this.config.size / 2;
    this.config.cy = this.config.size / 2;

    this.config.min = undefined != configuration.min ? configuration.min : 0;
    this.config.max = undefined != configuration.max ? configuration.max : 100;
    this.config.range = this.config.max - this.config.min;

    this.config.majorTicks = configuration.majorTicks || 5;
    this.config.minorTicks = configuration.minorTicks || 2;

    this.config.clickdata = configuration.clickdata;
    this.config.PointAt = configuration.PointAt;
    this.config.PoinText = configuration.PoinText;

    this.config.greenColor = configuration.greenColor || "#109618";
    this.config.yellowColor = configuration.yellowColor;
    this.config.PointColor = configuration.yellowColor;
    this.config.redColor = configuration.redColor || "#DC3912";

    this.config.transitionDuration = configuration.transitionDuration || 500;
  };

  this.render = function() {
    // 比例尺
    const width = $(".Cluster-down").width();
    const height = $(".Cluster-down").height();
    var scaleX = d3
      .scaleLinear()
      .domain([this.config.Xmin, this.config.Xmax])
      .nice() //nice用来优化数据  四舍五入等
      .range([0, width]); //亦可以用rangeRound输出整数 case1
    var scaleY = d3
      .scaleLinear()
      .domain([this.config.Ymin, this.config.Ymax])
      .nice() //nice用来优化数据  四舍五入等
      .range([0, height * 0.9]); //亦可以用rangeRound输出整数 case1
      // .range([height * 0.8, 0]); //亦可以用rangeRound输出整数 case2

    
    this.body = d3
      .select("#" + this.placeholderName)
      .append("svg:svg")
      .attr("class", `gauge${self.config.index}`)
      .attr("style", function() {
        return `position: absolute; left: ${scaleX(
          self.config.stuX
        )}; top: ${scaleY(self.config.stuY)}`; //返回圆心坐标
      })
      .attr("width", this.config.size)
      .attr("height", this.config.size);
      

    this.body
      .append("svg:circle")

      .attr("cx", this.config.cx)
      .attr("cy", this.config.cy)
      .attr("r", this.config.raduis)
      .style("fill", "#fff")
      .style("stroke", "#000")
      .style("stroke-width", "0px");

    //中间的圆圈
    this.body
      .append("svg:circle")
      .attr("cx", this.config.cx)
      .attr("cy", this.config.cy)
      .attr("r", 0.82 * this.config.raduis)
      .style("fill", "#fff")
      .style("stroke", "#CFCFCF")
      .style("stroke", self.config.yellowColor)
      .style("stroke-width", "1px");

    //中间层点击流pie  弄一个二维数组存放数据
    var dataset = [5, 5, 5, 5, 5, 5];
    var colors = self.config.clickdata;

    var arc = d3
      .arc()
      .outerRadius(this.config.raduis * 0.77)
      .innerRadius(this.config.raduis * 0.66)
      .padAngle(0.03);

    var piewai = d3.pie();
    var pie = piewai(dataset);
    var gRing = this.body.append("svg:g").attr("class", "pieContainer");
    var geachRing = gRing
      .selectAll("g")
      .data(pie)
      .enter()
      .append("g") 
      .attr("transform", function(d) {
        return "translate(" + self.config.cx + "," + self.config.cy + ")"; //返回圆心坐标
      });

    var gWai = geachRing
      .selectAll(".arc")
      .data(pie)
      .enter()
      .append("g");

    gWai
      .append("path")
      .attr("fill", function(d, i) {
        return colors[i];
      })
      .attr("d", function(d) {
        return arc(d); //调用弧生成器，得到路径值
      });

    for (var index in this.config.greenZones) {
      this.drawBand(
        this.config.greenZones[index].from,
        this.config.greenZones[index].to,
        self.config.greenColor
      );
    }

    //圆环黄色区域
    for (var index in this.config.yellowZones) {
      this.drawBand(
        this.config.yellowZones[index].from,
        this.config.yellowZones[index].to,
        self.config.yellowColor
      );
    }

    //圆环红色区域
    for (var index in this.config.redZones) {
      this.drawBand(
        this.config.redZones[index].from,
        this.config.redZones[index].to,
        // self.config.redColor
        self.config.yellowColor
      );
    }

    //线段
    this.drawBand1(
      this.config.yellowZones[index].from - 8,
      this.config.yellowZones[index].to,
      self.config.yellowColor
    );
    this.drawBand1(
      this.config.redZones[index].to,
      this.config.redZones[index].to + 8,
      self.config.yellowColor
    );

    //外层表情区域
    for (var index in this.config.faceZones) {
      this.drawBand2(
        this.config.faceZones[index].from,
        this.config.faceZones[index].to,
        self.config.yellowColor
      );
    }
    //刻度线
    var minor1 =
      (this.config.range / this.config.range) *
      (this.config.yellowZones[index].from - 8);
    var minor2 =
      (this.config.range / this.config.range) *
      (this.config.redZones[index].to + 8);
    var point1 = this.valueToPoint(minor1, 0.48);
    var point2 = this.valueToPoint(minor1, 0.62);
    var point3 = this.valueToPoint(minor2, 0.48);
    var point4 = this.valueToPoint(minor2, 0.62);
    //上面刻度
    this.body
      .append("svg:line")
      .attr("x1", point1.x)
      .attr("y1", point1.y)
      .attr("x2", point2.x)
      .attr("y2", point2.y)
      .style("stroke", "#333")
      .style("stroke-width", "1px");
    //下面刻度
    this.body
      .append("svg:line")
      .attr("x1", point3.x)
      .attr("y1", point3.y)
      .attr("x2", point4.x)
      .attr("y2", point4.y)
      .style("stroke", "#333")
      .style("stroke-width", "1px");

    //CPU标签
    // if (undefined != this.config.label) {
    //   var fontSize = Math.round(this.config.size / 9);
    //   this.body
    //     .append('svg:text')
    //     // .append(`svg${this.config.index}:text`)
    //     .attr('x', this.config.cx)
    //     .attr('y', this.config.cy / 2 + fontSize / 2)
    //     .attr('dy', fontSize / 2)
    //     .attr('text-anchor', 'middle')
    //     .text(this.config.label)
    //     .style('font-size', fontSize + 'px')
    //     .style('fill', '#333')
    //     .style('stroke-width', '0px');
    // }

    var fontSize = Math.round(this.config.size / 16);
    var majorDelta = this.config.range / (this.config.majorTicks - 1);
    for (
      var major = this.config.min;
      major <= this.config.max;
      major += majorDelta
    ) {
      var minorDelta = majorDelta / this.config.minorTicks;
      for (
        var minor = major + minorDelta;
        minor < Math.min(major + majorDelta, this.config.max);
        minor += minorDelta
      ) {
        var point1 = this.valueToPoint(minor, 0.75);
        var point2 = this.valueToPoint(minor, 0.85);

        // 指针小段
        // this.body
        //   .append('svg:line')
        //   .attr('x1', point1.x)
        //   .attr('y1', point1.y)
        //   .attr('x2', point2.x)
        //   .attr('y2', point2.y)
        //   .style('stroke', '#666')
        //   .style('stroke-width', '1px');
      }

      var point1 = this.valueToPoint(major, 0.7);
      var point2 = this.valueToPoint(major, 0.85);

      //指针大段
      // this.body
      //   .append('svg:line')
      //   .attr('x1', point1.x)
      //   .attr('y1', point1.y)
      //   .attr('x2', point2.x)
      //   .attr('y2', point2.y)
      //   .style('stroke', '#333')
      //   .style('stroke-width', '2px');

      if (major == this.config.min || major == this.config.max) {
        var point = this.valueToPoint(major, 0.63);
        if (major == this.config.min) {
          var textnum = major - 180;
        }
        if (major == this.config.max) {
          var textnum = major + 80;
        }

        //0-100数字
        this.body
          .append("svg:text")
          .attr("x", point.x)
          .attr("y", point.y)
          .attr("dy", fontSize / 3)
          .attr("text-anchor", major == this.config.min ? "start" : "end")
          .text(textnum)
          .style("font-size", fontSize + "px")
          .style("fill", "#333")
          .style("stroke-width", "0px");
      }
    }

    //指针元素，园、最下方数字、指针形状
    var pointerContainer = this.body
      .append("svg:g")
      .attr("class", "pointerContainer");

    var midValue = (this.config.min + this.config.max) / 2; //指针指向

    var pointerPath = this.buildPointerPath(midValue);

    var pointerLine = d3
      //   d3.svg
      .line()
      .x(function(d) {
        return d.x;
      })
      .y(function(d) {
        return d.y;
      });

    pointerContainer
      .selectAll("path")
      .data([pointerPath])
      .enter()
      .append("svg:path")
      .attr("d", pointerLine)
      .style("fill", "#dc3912")
      .style("stroke", "#c63310")
      .style("fill-opacity", 0.7);

    pointerContainer
      .append("svg:circle")
      .attr("cx", this.config.cx)
      .attr("cy", this.config.cy)
      .attr("r", 0.22 * this.config.raduis)
      .style("fill", self.config.PointColor)
      .style("stroke", "#666")
      .style("opacity", 1);

    var fontSize = Math.round(this.config.size / 10);
    //偏移数字量
    pointerContainer
      .selectAll("text")
      .data([midValue])
      .enter()
      .append("svg:text")
      .attr("x", this.config.cx)
      .attr("y", this.config.size - this.config.cy / 4 - fontSize)
      .attr("dy", fontSize / 2)
      .attr("text-anchor", "middle")
      .style("font-size", fontSize + "px")
      .style("fill", "#000")
      .style("stroke-width", "0px");

    this.redraw(self.config.PointAt, 0);
  };

  this.buildPointerPath = function(value) {
    var delta = this.config.range / 13;

    var head = valueToPoint(value, 0.5);
    var head1 = valueToPoint(value - delta, 0.18);
    var head2 = valueToPoint(value + delta, 0.18);

    var tailValue = value - (this.config.range * (1 / (270 / 360))) / 2;
    var tail = valueToPoint(tailValue, 0.28);
    var tail1 = valueToPoint(tailValue - delta, 0.12);
    var tail2 = valueToPoint(tailValue + delta, 0.12);

    // return [head, head1, tail2, tail, tail1, head2, head];
    return [head, head1, head2, head];

    function valueToPoint(value, factor) {
      var point = self.valueToPoint(value, factor);
      point.x -= self.config.cx;
      point.y -= self.config.cy;
      return point;
    }
  };

  //内层环
  this.drawBand = function(start, end, color) {
    if (0 >= end - start) return;

    this.body
      .append("svg:path")
      .style("fill", color)
      .attr(
        "d",
        d3
          //   d3.svg
          .arc()
          .startAngle(this.valueToRadians(start))
          .endAngle(this.valueToRadians(end))
          .innerRadius(0.5 * this.config.raduis)
          .outerRadius(0.6 * this.config.raduis)
      )
      .attr("transform", function() {
        return (
          "translate(" +
          self.config.cx +
          ", " +
          self.config.cy +
          ") rotate(270)" //设置方向旋转
        );
      });
  };

  //内层线
  this.drawBand1 = function(start, end, color) {
    if (0 >= end - start) return;

    this.body
      .append("svg:path")
      .style("fill", color)
      .attr(
        "d",
        d3
          //   d3.svg
          .arc()
          .startAngle(this.valueToRadians(start))
          .endAngle(this.valueToRadians(end))
          .innerRadius(0.53 * this.config.raduis)
          .outerRadius(0.57 * this.config.raduis)
      )
      .attr("transform", function() {
        return (
          "translate(" +
          self.config.cx +
          ", " +
          self.config.cy +
          ") rotate(270)" //设置方向旋转
        );
      });
  };

  //外层表情环
  this.drawBand2 = function(start, end, color) {
    if (0 >= end - start) return;

    this.body
      .append("svg:path")
      .style("fill", color)
      .attr(
        "d",
        d3
          //   d3.svg
          .arc()
          .startAngle(this.valueToRadians(start))
          .endAngle(this.valueToRadians(end))
          .innerRadius(0.86 * this.config.raduis)
          .outerRadius(1 * this.config.raduis)
      )
      .attr("transform", function() {
        return (
          "translate(" +
          self.config.cx +
          ", " +
          self.config.cy +
          ") rotate(270)" //设置方向旋转
        );
      });
  };

  this.redraw = function(value, transitionDuration) {
    var pointerContainer = this.body.select(".pointerContainer");

    pointerContainer.selectAll("text").text(self.config.PoinText);

    var pointer = pointerContainer.selectAll("path");
    pointer
      .transition()
      .duration(
        undefined != transitionDuration
          ? transitionDuration
          : this.config.transitionDuration
      )

      .attrTween("transform", function() {
        var pointerValue = value;
        if (value > self.config.max)
          pointerValue = self.config.max + 0.02 * self.config.range;
        else if (value < self.config.min)
          pointerValue = self.config.min - 0.02 * self.config.range;
        var targetRotation = self.valueToDegrees(pointerValue) - 90;
        var currentRotation = self._currentRotation || targetRotation;
        self._currentRotation = targetRotation;

        return function(step) {
          var rotation =
            currentRotation + (targetRotation - currentRotation) * step;
          return (
            "translate(" +
            self.config.cx +
            ", " +
            self.config.cy +
            ") rotate(" +
            rotation +
            ")"
          );
        };
      });
  };

  this.valueToDegrees = function(value) {
    return (
      (value / this.config.range) * 270 -
      ((this.config.min / this.config.range) * 270 + 45)
    );
  };

  this.valueToRadians = function(value) {
    return (this.valueToDegrees(value) * Math.PI) / 180;
  };

  this.valueToPoint = function(value, factor) {
    return {
      x:
        this.config.cx -
        this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
      y:
        this.config.cy -
        this.config.raduis * factor * Math.sin(this.valueToRadians(value))
    };
  };

  // initialization
  this.configure(configuration);
}
