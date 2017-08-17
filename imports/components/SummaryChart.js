import React, { Component } from 'react'
import d3 from 'd3';
import PropTypes from 'prop-types'
import { languageHelper,  TAPi18n, variables, timezonesHelper} from '../ARTIMO_FUNCIONES'

const chartHelpers = {
  areaName: 'summary',
  xAxis: d3.axisBottom(),
  yAxis: d3.axisLeft(),

  x: d3.scaleLinear(),
  y: d3.scaleOrdinal(),

  margins: {
    top: 10,
    left: 300,
    right: 20
  },
  color: index => d3.schemeCategory10[index%10],
  min: 25,
  max: 75,
}

const charts = {
  resetChart: (node, height, width) => {
    d3.select('.' + chartHelpers.areaName).remove();
    d3.select('.chart-' + chartHelpers.areaName).remove();
    d3.select(node).append("g")
      .attr("class", chartHelpers.areaName)
      .attr("transform", "translate(0,10)");
  },
  createBars: (snapshot, machineVars, height, width) => {
    let auxHeight = height - chartHelpers.margins.top*3;
    let auxWidth = width - chartHelpers.margins.right - chartHelpers.margins.left;
    let container = d3.select('.' + chartHelpers.areaName);
    let barData = [];
    let machineVariables = new Set(machineVars.map(v=>v.Id));
    let snapshotVars = new Set(snapshot.Variables.map(sv=> sv.VariableId));
    let intersection = new Set(
      [...machineVariables].filter(x => snapshotVars.has(x)));
    intersection = [...intersection];
    intersection.forEach(id=>{
      let machineVar = machineVars.find(v=>v.Id == id);
      let snapshotVar = snapshot.Variables.find(v=>v.VariableId == id);
      let x = snapshotVar.Values[0];
      if (machineVar.UpperLimit && machineVar.LowerLimit) {
        x = (x-machineVar.LowerLimit)*0.5/(machineVar.UpperLimit-machineVar.LowerLimit) + 0.25;
        if (x<0) x=0;
        if (x>1) x=1;
      }
      else x=0.5;
      barData.push({
        x: x,
        y: variables.getItemDescription(machineVar.Descriptions),
        s: snapshotVar,
        v: machineVar
      });
    })
    barData.push({x: 0,y: ''});
    chartHelpers.x
      .range([0, auxWidth])
      .domain([0, 1]);
    chartHelpers.xAxis
      .scale(chartHelpers.x)
      .ticks(4);
    let step = (auxHeight-chartHelpers.margins.top)/(barData.length-1);
    let div = d3.select('body').append("div")
      .attr("class", "tooltip chart-" + chartHelpers.areaName)
      .style("display", "none")
      .style('max-width', "200px")
      .style('background-color', "white")
      .style("border-width", "2px")
      .style("border-style", "solid")
      .style("border-color", "black")
      .style("padding", "2px")
      
    chartHelpers.y
      .range(barData.map((d,i)=>i*step+chartHelpers.margins.top))
      .domain(barData.map(d=>d.y));
    chartHelpers.yAxis
      .scale(chartHelpers.y)
      .tickFormat(d=>d);

    container.selectAll("bar")
      .data(barData)
    .enter().append("rect")
      .style("fill", d=> {
        if (d.x>0.30 && d.x<0.70) return 'green';
        else if (d.x>0.25 && d.x<0.75) return 'yellow';
        else return 'red';
      })
      .attr("x", chartHelpers.margins.left)
      .attr("width", d=> chartHelpers.x(d.x))
      .attr("y", (d,i) => chartHelpers.margins.top + i*step)
      .attr("height", d => step-10)
      .on("mouseover", (d, i) => {
        $(div.node()).show();

        let measureUnit = d.v.MeasureUnit;
        let value = languageHelper.formatNumber(d.s.Values[d.v.UserIndex], 2) + ' ' + measureUnit;
        let upperLimit = d.v.UpperLimit !== null? d.v.UpperLimit + ' ' + measureUnit : 'N/A';
        let lowerLimit = d.v.LowerLimit !== null? d.v.LowerLimit + ' ' + measureUnit : 'N/A';
        let htmlText = TAPi18n.__('Current_value') + ': ' + value + '<br>';
        htmlText += TAPi18n.__('UpperLimitValue') + ': ' + upperLimit + '<br>';
        htmlText += TAPi18n.__('LowerLimitValue') + ': ' + lowerLimit + '<br>';

        div.transition()
          .duration(200)
          .style("opacity", 1);
        
        div.html(htmlText);
        let overRect = $($(container.node()).children('rect')[i]);

        div.style("left", overRect.offset().left + "px")
          .style("top", (overRect.offset().top - $(div.node()).height()-10) + "px");
      })
      .on("mouseout", () => {
        div.transition()
        .duration(500)
        .style("opacity", 0)
        .on('end', () => $(div.node()).hide())
      })
  },
  defineAxes: (height, width) => {
    let auxHeight = height - chartHelpers.margins.top*3;
    let auxWidth = width - chartHelpers.margins.right - chartHelpers.margins.left;
    let container = d3.select('.' + chartHelpers.areaName);
    container.append('g')
      .attr("class", "x axis")
      .attr("transform", "translate(" + chartHelpers.margins.left + "," + auxHeight + ")")
      .call(chartHelpers.xAxis);
    container.append('g')
      .attr("class", "y axis")
      .attr("transform", "translate(" + chartHelpers.margins.left + "," + 0 + ")")
      .call(chartHelpers.yAxis);
  },
  createLimitLines: (height, width) => {
    let container = d3.select('.' + chartHelpers.areaName);
    container.append('line')
      .attr('x1', chartHelpers.margins.left + chartHelpers.x(0.25))
      .attr('y1', chartHelpers.margins.top)
      .attr('x2', chartHelpers.margins.left + chartHelpers.x(0.25))
      .attr('y2', height-chartHelpers.margins.top*3)
      .attr('stroke-width', '1')
      .attr('stroke-dasharray','12,5')
      .attr('stroke', 'black');
    container.append('line')
      .attr('x1', chartHelpers.margins.left + chartHelpers.x(0.75))
      .attr('y1', chartHelpers.margins.top)
      .attr('x2', chartHelpers.margins.left + chartHelpers.x(0.75))
      .attr('y2', height-chartHelpers.margins.top*3)
      .attr('stroke-width', '1')
      .attr('stroke-dasharray','12,5')
      .attr('stroke', 'black');
  }
}

class SummaryChart extends Component {
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
    const node = this.node;
    if (this.props.areaName) chartHelpers.areaName = this.props.areaName;
    charts.resetChart(node, this.props.height, this.props.width);
    if (this.props.selectedSnapshot !== null && this.props.variables.length > 0) {
      let height = this.props.height;
      let width = this.props.width;

      charts.createBars(this.props.selectedSnapshot, this.props.variables, height, width);
      charts.defineAxes(height, width);
      charts.createLimitLines(height, width);
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

SummaryChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default SummaryChart