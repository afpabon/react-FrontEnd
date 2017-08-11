import React, { Component } from 'react'
import d3 from 'd3';
import moment from 'moment-timezone'
import PropTypes from 'prop-types'


const chartHelpers = {
  x: d3.scaleTime(),
  // Main x-Axis with times and dates
  xAxis: d3.axisBottom(),
  // auxiliary x-Axis time scale
  auxX: d3.scaleTime(),
  // auxiliary y-Axis
  auxY: d3.scaleLinear(),
  // auxiliary x-Axis with times and dates
  auxXAxis: d3.axisLeft(),
  // auxiliary y-Axis with aux value range
  auxYAxis: d3.axisLeft(),
  // Data table for aux area interpolation
  auxTable : null,
  // Array with functions for the different y-Axes
  yAxes: []
}

const charts = {
  createXAxis: (node, data, height, width) => {
  },
  createAuxChart: (node, lineData, dotData, height, width) => {
    let maxX = d3.max(dotData, v => {return v.x});
    let minX = d3.min(dotData, v => {return v.x});
    let maxY = d3.max(dotData, v => {return v.y});
    let minY = 0;

    let formatDate = function (d) {
      return moment.tz(d, 'America/Bogota').format('DD/MM/YYYY')
    };
    
    d3.select('.focus').remove();
    d3.select('.context').remove();
    d3.select(node).append("g")
      .attr("class", "focus")
      .attr("transform", "translate(0," + 20 + ")");
    d3.select(node).append("g")
      .attr("class", "context")
      .attr("transform", "translate(0," + (height - 50) + ")");
    
    chartHelpers.auxX
      .range([10, width-10])
      .domain([minX, maxX])

    chartHelpers.auxY
      .range([50, 0])
      .domain([minY, maxY])

    var lowerLine = d3.line()
      .curve(d3.curveLinear)
      .x(d => { return chartHelpers.auxX(d.x)})
      .y(d => { return chartHelpers.auxY(d.y)})
      .defined(d => { return !d.noLine});
    
    d3.select('.context').append('path')
      .datum(lineData)
      .attr("class", "line")
      .attr("d", lowerLine)
      .style("fill", "none")
      .style("stroke", d3.rgb(100, 80, 50))
      .style("stroke-width", "1.5px")
    d3.select('.context').selectAll(".dot")
      .data(dotData)
      .enter().append("circle")
      // .attr("id", function(d) {
      //   if(d.noLine) return 'axis_none';
      //   else return 'axis_' + d.i + '_' + d.y;})
      .attr("class","tooltip-dot")
      .attr('stroke', 'black')
      .attr('fill', function(d) { return d3.rgb(100, 80, 50) })
      .attr("cx", function(d) { return chartHelpers.auxX(d.x); })
      .attr("cy", function(d) { return chartHelpers.auxY(d.y); })
      .attr("r", 2.5)

  }
}

class AuxChart extends Component {
  constructor(props){
    super(props)
    this.createAuxChart = this.createAuxChart.bind(this)
  }
  componentDidMount() {
    this.createAuxChart()
  }
  componentDidUpdate() {
    this.createAuxChart()
  }
  createAuxChart() {
    let data = this.props.data.sort((a,b)=> a.x - b.x);
    let linesData = [];
    let finalData = [];
    data.forEach(e => {
      if (!linesData.find(v=>v.x.getTime() === e.x.getTime())) {
        finalData.push(e);
        linesData.push({x: e.x, y: 0});
        linesData.push(e);
        linesData.push({
          x: e.x,
          y: e.y,
          noLine: true,
        });
      }
    })
    const node = this.node;
    charts.createXAxis(node, finalData, this.props.height, this.props.width);
    charts.createAuxChart(node, linesData, finalData, this.props.height, this.props.width);
  }
  render() {
    return <svg 
      ref={node => this.node = node}
      width={this.props.width} height={this.props.height}
    >
    </svg>
  }
}


AuxChart.propTypes = {
  data: PropTypes.array,
  size: PropTypes.array
}

export default AuxChart