import React, { Component } from 'react'
import d3 from 'd3';
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'

const chartHelpers = {
  // Main x-Axis with times and dates
  xAxis: d3.axisBottom(),
  // auxiliary x-Axis time scale
  x: d3.scaleTime(),
  // auxiliary y-Axis
  auxY: d3.scaleLinear(),
  margins: {
    top: 10,
    left: 5,
    right: 5
  },
  axisXOffset: 50,
  yAxes : [],
  color: d3.schemeCategory10,
}

const charts = {
  resetChart: (node, height, width) => {
    d3.select('.focus').remove();
    d3.select('.chart').remove();
    d3.select(node).append("g")
      .attr("class", "focus")
      .attr("transform", "translate(0,10)");
    
  },
  drawChart: (node, lineData, variables, height) => {
    let data = lineData.sort((a,b)=> a.x - b.x);
    chartHelpers.yAxes = [];
    variables.forEach((v,i)=>{
      if (_.some(data, (obj) => {
        return (obj["y" + i] !== undefined && obj["y" + i] !== null);
      })) {
        let newAxis = new Object();
        // Build axis scale
        let minVal = d3.min(data, v => { return v["y" + i]; });
        let maxVal = d3.max(data, v => { return v["y" + i]; });
        let minD = minVal - (maxVal-minVal) * 0.1;
        let maxD = maxVal + (maxVal-minVal) * 0.1;
        let tickMinVal = minVal;
        let tickMaxVal = maxVal;
        if(minD == maxD){ //if min and max axis scale are the same value, add offset.
          if(minD == 0){
            minD = minD - 1;
            maxD = maxD + 1;
          }
          else{
            minD = minD * 0.9;
            maxD = maxD * 1.1;
          }
          minVal = minD;
          maxVal = maxD;
        }
        newAxis.y = d3.scaleLinear()
          .range([height, 0])
          .domain([minD, maxD]);
        
        let tickWidth = (maxVal-minVal)/4;
        let ticks = [];
        for(let iTick=0; iTick<5;iTick++){
          ticks.push(tickWidth*iTick + minVal);
        }
        // Build new svg object for axis
        newAxis.yAxis = d3.axisLeft()
          .scale(newAxis.y)
          .tickValues(ticks)
        // Build new axis data line
        newAxis.line = d3.line()
          .curve(d3.curveLinear)
          .x(function(d) { return chartHelpers.x(d.x); })
          .y(function(d) { return chartHelpers.yAxes[d.i].y(d.y); })
        // Add new axis to y-axes collection
        chartHelpers.yAxes.push(newAxis);
      }
    });
    let chartsKeys = d3.keys(data[0]).filter(function(key) {
      return key !== "x";
    });
    let values = chartsKeys.map(function(name) {
      return {
        name: name,
        values: data.filter(function(d) {
          return d[name] != null;
        })
        .map(function(d) {
          return {i: name.substring(1), x: d.x, y: +d[name], noLine: d.noLine};
        })
      };
    });
    console.log(values);
    var value = d3.select('.focus').selectAll(".value")
      .data(values)
      .enter()
      .append("g")
      .attr("class", "value")
    value.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return chartHelpers.yAxes[parseInt(d.name.substring(1))].line(d.values);
      }).style("stroke", function(d) {var colorIndex = parseInt(d.name.substring(1)); return chartHelpers.color[d.name.substring(1)]; });
    return;
    let newId = (new Meteor.Collection.ObjectID()).valueOf();

    let lowerLine = d3.line()
      .curve(d3.curveLinear)
      .x(d => { return chartHelpers.x(d.x)})
      .y(d => { return chartHelpers.auxY(d.y)})
      .defined(d => { return !d.noLine});
    
    d3.select('.focus').append('path')
      .datum(lineData)
      .attr("class", "line")
      .attr("d", lowerLine)
      .style("fill", "none")
      .style("stroke", d3.rgb(100, 80, 50))
      .style("stroke-width", "1.5px")
    let div = d3.select("body").append("div")
      .attr("class", "tooltip chart")
      .attr("id", newId)
      .style("opacity", 0)
      .style("display", "none")
      .style('max-width', "140px");
    
    d3.select('.focus').selectAll(".dot")
      .data(dotData)
      .enter().append("circle")
      .attr("id", (d, i) => 'index_' + i)
      .attr("class","tooltip-dot")
      .attr('stroke', 'black')
      .attr('fill', d3.rgb(100, 80, 50))
      .attr('cx', (d) => { return chartHelpers.x(d.x); })
      .attr('cy', (d) => { return chartHelpers.auxY(d.y); })
      .attr("r", 2.5)
      .on("mouseover", (d) => {
        let maxWidth = $('body').width();
        let xOffset = d3.event.pageX;
        if (d3.event.pageX + 140 > maxWidth) {
          xOffset = maxWidth - 140;
        }
        $('div#' + newId).show();
        let html = d.data.Variables.map((v) => {
          return v.VariableCode + '\n';
        });
        div.transition()
          .duration(200)
          .style("border-width", "2px")
          .style("border-style", "solid")
          .style("border-color", d3.rgb(100, 80, 50))
          .style("opacity", 1);
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
  },
  createXAxis: (node, data, height) => {
    let formatDate = function (d) {
      return moment.tz(d, 'America/Bogota').format('DD/MM/YYYY')
    };
    chartHelpers.xAxis
      .scale(chartHelpers.x)
      .tickFormat(function(d) {
        return formatDate(d);
      });
    d3.select('.focus').append('g')
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(chartHelpers.xAxis);
  },
}

class Chart extends Component {
  constructor(props){
    super(props)
    this.createChart = this.createChart.bind(this)
  }
  componentDidMount() {
    this.createChart()
  }
  componentDidUpdate() {
    this.createChart()
  }
  createChart() {
    let finalData = this.props.data;
    let height = this.props.height;
    let width = this.props.width;
    let auxHeight = height - chartHelpers.margins.top*3;
    let selectedVars = this.props.selectedVars && this.props.selectedVars.count? this.props.selectedVars.count : 0;
    let leftMargin = chartHelpers.axisXOffset*selectedVars + chartHelpers.margins.left;

    let maxX = d3.max(finalData, v => {return v.x});
    let minX = d3.min(finalData, v => {return v.x});
    
    chartHelpers.x
      .range([leftMargin, width-chartHelpers.margins.right])
      .domain([minX, maxX])

    const node = this.node;
    charts.resetChart(node, this.props.height, this.props.width);
    if (finalData.length > 0) {
      charts.createXAxis(node, finalData, auxHeight);
      if (this.props.selectedVars.count > 0) {
        let finalSnapshots = [];
        finalData.forEach(d=> {
          let index = finalSnapshots.findIndex(s=>s.x.getTime() === d.x.getTime());
          if (index < 0) {
            index = finalSnapshots.length;
            finalSnapshots.push({x: d.x});
          }
          this.props.selectedVars.variables.forEach((variableId, i)=>{
            let exists = d.y.find(v=>v.VariableId === variableId);
            if (exists && !finalSnapshots[index]['y'+i]) {
              finalSnapshots[index]['y'+i] = exists.Values[0];
            }
            else {
              finalSnapshots[index]['y'+i] = null;
            }
          });
        });
        charts.drawChart(node, finalSnapshots, this.props.selectedVars.variables, auxHeight);
      }
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

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default Chart