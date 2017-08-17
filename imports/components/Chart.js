import React, { Component } from 'react'
import d3 from 'd3';
import PropTypes from 'prop-types'
import { languageHelper,  TAPi18n, variables, timezonesHelper} from '../ARTIMO_FUNCIONES'

const chartHelpers = {
  areaName: 'focus',
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
  color: index => d3.schemeCategory10[index%10],
}

const charts = {
  resetChart: (node, height, width) => {
    d3.select('.' + chartHelpers.areaName).remove();
    d3.select('.chart-' + chartHelpers.areaName).remove();
    d3.select(node).append("g")
      .attr("class", chartHelpers.areaName)
      .attr("transform", "translate(0,10)");
    
  },
  createXAxis: (data, leftMargin, height, width) => {
    let maxX = d3.max(data, v => v.x);
    let minX = d3.min(data, v => v.x);

    chartHelpers.x
      .range([leftMargin, width+leftMargin])
      .domain([minX, maxX])
    let tickWidth = (maxX-minX)/11;
    let ticks = [];
    for(let iTick=0; iTick<11;iTick++) {
      let date = new Date(tickWidth*iTick + minX.getTime());
      ticks.push(date);
    }
    chartHelpers.xAxis
      .scale(chartHelpers.x)
      .tickValues(ticks)
      .tickFormat(d => timezonesHelper.getShortTimeString(d));
    d3.select('.' + chartHelpers.areaName).append('g')
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(chartHelpers.xAxis);
  },
  createYAxis: (container, index, variable, height, width, varlength) => {
    let xOffset = height / 2;
    let offset = chartHelpers.axisXOffset * (varlength-index) + chartHelpers.margins.left;
    let axis = container.append("g")
      .attr("class", "y axis")
      .style("stroke", chartHelpers.color(index))
      .call(chartHelpers.yAxes[index].yAxis)
      .attr("transform", "translate(" + offset + ",0)");
    axis.selectAll("text")
      .attr('dx',-6);
    axis.append("text")
      .attr("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif")
      .attr("font-size", "12.5px")
      // .attr("font-weight", "bold")
      .attr("transform", "rotate(-90)")
      .attr("fill", chartHelpers.color(index))
      .attr("dy", "-38px")
      .attr("dx", "-" + xOffset + "px")
      .style("text-anchor", "middle")
      .style("letter-spacing", "1px")
      .text(variables.getItemDescription(variable.Descriptions) + ' (' + variable.MeasureUnit + ')') //TO DO: AJUSTAR IDIOMA (getDescription())
    if(index==0){
      let yAxisGrid = chartHelpers.yAxes[index].yAxis
        .tickSize(-width, 0)
        .tickFormat("")
      container.append("g")
        .classed('y', true)
        .classed('grid', true)
        .style("stroke", chartHelpers.color(index))
        .attr('stroke-dasharray','6,2')
        .attr("opacity", "0.2")
        .call(yAxisGrid)
        .attr("transform", "translate(" + offset + ",0)");
    }
  },
  createLimits: (container, index, variable, height, width, x, y) => {
    if (variable.LowerLimit && variable.LowerLimit > y[0] && variable.LowerLimit < y[1]) {
      container.append('line')
        .attr('x1', chartHelpers.x(x[0]))
        .attr('y1', chartHelpers.yAxes[index].y(variable.LowerLimit))
        .attr('x2', chartHelpers.x(x[1]))
        .attr('y2', chartHelpers.yAxes[index].y(variable.LowerLimit))
        .attr('stroke-width', '1')
        .attr('stroke-dasharray','15,5')
        .attr('stroke', chartHelpers.color(index));

      container.append("text")
        .attr("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif")
        .attr("font-size", "11px")
        .attr("fill", chartHelpers.color(index))
        .attr("dy", chartHelpers.yAxes[index].y(variable.LowerLimit) + "px")
        .attr("dx", (width/2) + "px")
        .style("text-anchor", "middle")
        .text(TAPi18n.__('Variables_LowerLimit')) //TO DO: Add TAPi18n
    }
    if (variable.UpperLimit && variable.UpperLimit > y[0] && variable.UpperLimit < y[1]) {
      container.append('line')
        .attr('x1', chartHelpers.x(x[0]))
        .attr('y1', chartHelpers.yAxes[index].y(variable.UpperLimit))
        .attr('x2', chartHelpers.x(x[1]))
        .attr('y2', chartHelpers.yAxes[index].y(variable.UpperLimit))
        .attr('stroke-width', '1')
        .attr('stroke-dasharray','15,5')
        .attr('stroke', chartHelpers.color(index));

      container.append("text")
        .attr("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif")
        .attr("font-size", "11px")
        .attr("fill", chartHelpers.color(index))
        .attr("dy", chartHelpers.yAxes[index].y(variable.UpperLimit) + "px")
        .attr("dx", (width/2) + "px")
        .style("text-anchor", "middle")
        .text(TAPi18n.__('Variables_UpperLimit'))
    }
  },
  drawChart: (lineData, vars, height, width) => {
    let focus = d3.select('.' + chartHelpers.areaName);
    let limits = focus.append("g")
      .attr("class", "limits");
    let yAxes = focus.append("g")
      .attr("class", "y-axes");
    let data = lineData.sort((a,b)=> a.x - b.x);
    chartHelpers.yAxes = [];
    let minX = d3.min(data, v => v.x.getTime());
    let maxX = d3.max(data, v => v.x.getTime());
    vars.forEach((variable,i)=>{
      if (_.some(data, obj => obj["y" + i] !== undefined && obj["y" + i] !== null)) {
        let newAxis = new Object();
        // Build axis scale
        let minVal = d3.min(data, v => v["y" + i]);
        let maxVal = d3.max(data, v => v["y" + i]);
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
          .x(d => chartHelpers.x(d.x))
          .y(d => chartHelpers.yAxes[d.i].y(d.y))
        // Add new axis to y-axes collection
        chartHelpers.yAxes.push(newAxis);
        charts.createYAxis(yAxes, i, variable, height, width, vars.length);
        charts.createLimits(limits, i, variable, height, width, [minX, maxX], [minD, maxD]);
      }
    });
    let chartsKeys = d3.keys(data[0]).filter(key =>key !== "x");
    let values = chartsKeys.map(name => {
      return {
        name: name,
        values: data.filter(d => d[name] != null)
        .map(d => {return {i: name.substring(1), x: d.x, y: +d[name], noLine: d.noLine}})
      };
    });
    let value = focus.selectAll(".value")
      .data(values)
      .enter()
      .append("g")
      .attr("class", "value")
    value.append("path")
      .attr("class", "line")
      .style("fill", "none")
      .style("stroke-width", "1.1px")
      .attr("d", d => chartHelpers.yAxes[parseInt(d.name.substring(1))].line(d.values))
      .style("stroke", d => {let colorIndex = parseInt(d.name.substring(1)); return chartHelpers.color(d.name.substring(1)); });

    let div = d3.select("body").append("div")
      .attr("class", "tooltip chart-" + chartHelpers.areaName)
      .style("opacity", 0)
      .style("display", "none")
      .style('max-width', "140px")
      .style('background-color', "white")
      .style("border-width", "2px")
      .style("border-style", "solid")
      .style("border-color", "black")
      .style("padding", "2px");
    
    value.selectAll(".dot")
      .data(d => d.values)
      .enter().append("circle")
      .attr("id", d => 'axis_' + d.i + '_' + d.y)
      .attr("class","main-tooltip-dot")
      .attr('stroke', 'black')
      .attr('fill', d => chartHelpers.color(d.i))
      .attr("cx", d => chartHelpers.x(d.x))
      .attr("cy", d => chartHelpers.yAxes[d.i].y(d.y))
      .attr("r", 2.5)
      .on("mouseover", (d) => {
        let overElements = $('.main-tooltip-dot[cx="' + chartHelpers.x(d.x) + '"]');
        let htmlText ="<label>".concat(timezonesHelper.getShortTimeString(d.x) , "</label>");
        for (let eIndex=0; eIndex < overElements.length; eIndex++){
          let selDot = $(overElements[eIndex]);
          let eId = (selDot.attr('id')).split('_');
          let ei = parseInt(eId[1]);
          let ey = parseFloat(eId[2]);
          let fill = selDot.attr('fill');
          let tooltipText = '<div style="color: ' + fill + '">' + 
            variables.getItemDescription(vars[ei].Descriptions) + ': ' + languageHelper.formatNumber(ey, 2)
            + ' ' + vars[ei].MeasureUnit + 
          '</div>';
          htmlText = htmlText.concat(tooltipText);
        }
        let maxWidth = $('body').width();
        let xOffset = d3.event.pageX;
        if (d3.event.pageX + 140 > maxWidth) {
          xOffset = maxWidth - 140;
        }
        $(div.node()).show();
        div.transition()
          .duration(200)
          .style("opacity", 0.9);
        div.html(htmlText);
        let yOffset = d3.event.pageY - $(div.node()).height() - 10;
        if (yOffset<0) yOffset = d3.event.pageY + 10;

        div.style("left", xOffset + "px")
          .style("top", (yOffset - 4) + "px");
      })
      .on("mouseout", () => {
        div.transition()
        .duration(500)
        .style("opacity", 0)
        .on('end', () => $(div.node()).hide())
      })
  }
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
    if (this.props.areaName) chartHelpers.areaName = this.props.areaName;
    let finalData = this.props.data;
    let height = this.props.height;
    let width = this.props.width;
    let auxHeight = height - chartHelpers.margins.top*3;

    const node = this.node;
    charts.resetChart(node, this.props.height, this.props.width);
    if (finalData.length > 0) {
      let vars = this.props.selectedVars.variables;
      let selectedVars = vars? vars.length : 0;
      let leftMargin = chartHelpers.axisXOffset*selectedVars + chartHelpers.margins.left;
      let auxWidth = width - chartHelpers.margins.right - leftMargin;
      if (selectedVars > 0) {
        charts.createXAxis(finalData, leftMargin, auxHeight, auxWidth);
        let finalSnapshots = [];
        finalData.forEach(d=> {
          let index = finalSnapshots.findIndex(s=>s.x.getTime() === d.x.getTime());
          if (index < 0) {
            index = finalSnapshots.length;
            finalSnapshots.push({x: d.x});
          }
          vars.forEach((variable, i)=>{
            let exists = d.data.Variables.find(v=>v.VariableId === variable.Id);
            if (exists && !finalSnapshots[index]['y'+i]) {
              finalSnapshots[index]['y'+i] = exists.Values[0];
            }
            else {
              finalSnapshots[index]['y'+i] = null;
            }
          });
        });
        charts.drawChart(finalSnapshots, vars, auxHeight, auxWidth);
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