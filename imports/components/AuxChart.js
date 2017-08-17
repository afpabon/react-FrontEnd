import React, { Component } from 'react'
import d3 from 'd3';
import PropTypes from 'prop-types'
import { languageHelper,  TAPi18n, variables, timezonesHelper} from '../ARTIMO_FUNCIONES'

const chartHelpers = {
  areaName: 'context',
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
    d3.select('.'+chartHelpers.areaName).remove();
    d3.select('.chart-' + chartHelpers.areaName).remove();
    d3.select(node).append("g")
      .attr("class", chartHelpers.areaName)
      .attr("transform", "translate(0,10)");
    
  },
  drawAuxChart: (dotData, snapshotClicked, selectedSnapshot) => {
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

    let mouseover =  (d, i) => {
      let maxWidth = $('body').width();
      let point = $($('.' + chartHelpers.areaName).children('circle')[i]);
      let xOffset = point.offset().left;
      if (d3.event.pageX + 140 > maxWidth) {
        xOffset = maxWidth - 140;
      }
      $(div.node()).show();

      let htmlText ="<label>".concat(timezonesHelper.getShortTimeString(d.x) , "</label> <br>");
      htmlText = htmlText.concat(TAPi18n.__('Variables'), ': ', d.data.Variables.length);
      div.transition()
        .duration(200)
        .style("opacity", 1);
      div.html(htmlText);
      let yOffset = point.offset().top - $(div.node()).height() - 10;

      div.style("left", xOffset + "px")
        .style("top", (yOffset - 4) + "px");
    }

    let mouseout = () => {
      div.transition()
      .duration(500)
      .style("opacity", 0)
      .on('end', ()=>$(div.node()).hide())
    }
    
    d3.select('.'+chartHelpers.areaName).selectAll(".line")
      .data(dotData)
      .enter().append("line")
      .attr("class","line-test")
      .attr('x1', d => chartHelpers.auxX(d.x))
      .attr('y1', chartHelpers.auxY(0))
      .attr('x2', d => chartHelpers.auxX(d.x))
      .attr('y2', d => chartHelpers.auxY(d.y))
      .attr('stroke-width', '2px')
      .attr('stroke', d => {
        return (selectedSnapshot && (selectedSnapshot._id.valueOf() === d.data._id.valueOf()))?
        'red' : d3.rgb(100, 80, 50);
      })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("click", d =>snapshotClicked(d.data));

    d3.select('.'+chartHelpers.areaName).selectAll(".dot")
      .data(dotData)
      .enter().append("circle")
      .attr("class","tooltip-dot")
      .attr('fill', d => {
        return (selectedSnapshot && (selectedSnapshot._id.valueOf() === d.data._id.valueOf()))?
        'red' : d3.rgb(100, 80, 50);
      })
      .attr('cx', d => chartHelpers.auxX(d.x))
      .attr('cy', d => chartHelpers.auxY(d.y))
      .attr("r", 2.5)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("click", d =>snapshotClicked(d.data));
  },
  createXAxis: (data, height, ticks) => {
    chartHelpers.xAxis
      .scale(chartHelpers.auxX)
      .tickValues(ticks)
      .tickFormat(d => timezonesHelper.getShortTimeString(d));
    d3.select('.' + chartHelpers.areaName).append('g')
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
    if (this.props.areaName) chartHelpers.areaName = this.props.areaName;
    let selectedSnapshot = this.props.selectedSnapshot? this.props.selectedSnapshot : null;
    let data = this.props.data.sort((a,b)=> a.x - b.x);
    let finalData = [];
    data.forEach(e => {
      if (!finalData.find(v=>v.x.getTime() === e.x.getTime())) {
        finalData.push(e);
      }
    })
    let height = this.props.height;
    let width = this.props.width;
    let auxHeight = height - chartHelpers.margins.top*3;
    let selectedVars = this.props.selectedVars? this.props.selectedVars : 0;
    let leftMargin = chartHelpers.axisXOffset*selectedVars + chartHelpers.margins.left;

    let maxX = d3.max(finalData, v => v.x);
    let minX = d3.min(finalData, v => v.x);
    let maxY = d3.max(finalData, v => v.y);
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
      charts.drawAuxChart(finalData, this.props.snapshotClicked, selectedSnapshot);

      let tickWidth = (maxX-minX)/11;
      let ticks = [];
      for(let iTick=1; iTick<11;iTick++) {
        let date = new Date(tickWidth*iTick + minX.getTime());
        ticks.push(date);
      }

      charts.createXAxis(finalData, auxHeight, ticks);
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