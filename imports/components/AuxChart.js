import React, { Component } from 'react'
import d3 from 'd3';
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'

const chartHelpers = {
  // Main x-Axis with times and dates
  xAxis: d3.axisBottom(),
  // auxiliary x-Axis time scale
  auxX: d3.scaleTime(),
  // auxiliary y-Axis
  auxY: d3.scaleLinear(),
  margins: {
    top: 10,
    left: 5,
    right: 5
  },
  axisXOffset: 50,
}

const charts = {
  resetChart: (node, height, width) => {
    d3.select('.context').remove();
    d3.select('.auxchart').remove();
    d3.select(node).append("g")
      .attr("class", "context")
      .attr("transform", "translate(0,10)");
    
  },
  drawAuxChart: (node, lineData, dotData, snapshotClicked) => {
    let newId = (new Meteor.Collection.ObjectID()).valueOf();

    let lowerLine = d3.line()
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
    let div = d3.select("body").append("div")
      .attr("class", "tooltip auxchart")
      .attr("id", newId)
      .style("opacity", 0)
      .style("display", "none")
      .style('max-width', "140px");
    
    d3.select('.context').selectAll(".dot")
      .data(dotData)
      .enter().append("circle")
      .attr("id", (d, i) => 'index_' + i)
      .attr("class","tooltip-dot")
      .attr('stroke', 'black')
      .attr('fill', d3.rgb(100, 80, 50))
      .attr('cx', (d) => { return chartHelpers.auxX(d.x); })
      .attr('cy', (d) => { return chartHelpers.auxY(d.y); })
      .attr("r", 2.5)
      .on("mouseover", (d) => {
        let maxWidth = $('body').width();
        let xOffset = d3.event.pageX;
        if (d3.event.pageX + 140 > maxWidth) {
          xOffset = maxWidth - 140;
        }
        $('div#' + newId).show();

        //TO DO: AJUSTAR TOOLTIP
        let html = d.data.Variables.map((v) => {
          return v.VariableCode + '\n';
        });
        div.transition()
          .duration(200)
          .style("border-width", "2px")
          .style("border-style", "solid")
          .style("border-color", d3.rgb(100, 80, 50))
          .style("opacity", .9);
        div.html(html.join(','));
        let yOffset = d3.event.pageY - $('.tooltip').height() - 10;

        div.style("left", xOffset + "px")
          .style("top", (yOffset) + "px");
      })
      .on("mouseout", () => {
        div.transition()
        .duration(500)
        .style("opacity", 0)
        .on('end', ()=>{
          $('div#' + newId).hide();
        })
      })
      .on("click", (d) =>{
        snapshotClicked(d.data);
      });
  },
  createXAxis: (node, data, height) => {
    let formatDate = function (d) {
      return moment.tz(d, 'America/Bogota').format('DD/MM/YYYY')
    };
    chartHelpers.xAxis
      .scale(chartHelpers.auxX)
      .tickFormat(function(d) {
        return formatDate(d);
      });
    d3.select('.context').append('g')
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(chartHelpers.xAxis);
  },
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
    let height = this.props.height;
    let width = this.props.width;
    let auxHeight = height - chartHelpers.margins.top*3;
    let selectedVars = this.props.selectedVars? this.props.selectedVars : 0;
    let leftMargin = chartHelpers.axisXOffset*selectedVars + chartHelpers.margins.left;

    let maxX = d3.max(finalData, v => {return v.x});
    let minX = d3.min(finalData, v => {return v.x});
    let maxY = d3.max(finalData, v => {return v.y});
    let minY = 0;

    chartHelpers.auxX
      .range([leftMargin, width-chartHelpers.margins.right])
      .domain([minX, maxX])

    chartHelpers.auxY
      .range([auxHeight, 0])
      .domain([minY, maxY])

    const node = this.node;
    charts.resetChart(node, this.props.height, this.props.width);
    if (finalData.length > 0) {
      charts.drawAuxChart(node, linesData, finalData, this.props.snapshotClicked);
      charts.createXAxis(node, finalData, auxHeight);
    }
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
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  snapshotClicked: PropTypes.func.isRequired
}

export default AuxChart