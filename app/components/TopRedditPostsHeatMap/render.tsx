import * as d3 from 'd3';
import { HeatMapDataPoint } from '../../containers/TopRedditPosts';
import React from 'react';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { getDayName } from '../../utils/dateHelper';

export function renderHeatMap(parent: any, width: number, margin: { top: number; left: number; bottom: number; right: number }, height: number, data: HeatMapDataPoint[]) {
  // append the svg object to the body of the page
  const svg = parent
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')');

  //Read the data
  var myGroups = d3.map(data, function(d) {
    return d.hourOfDay;
  }).keys();
  var myVars = d3.map(data, function(d) {
    return d.dayOfWeek;
  }).keys();
  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([0, width])
    .domain(myGroups)
    .padding(0.05);
  svg.append('g')
    .attr('class', 'MuiTypography-body2')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickSize(0))
    .select('.domain').remove();

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([height, 0])
    .domain(myVars)
    .padding(0.05);
  svg.append('g')
    .call(d3.axisLeft(y).tickSize(0).tickFormat(getDayName))
    .attr('class', 'MuiTypography-body2')
    .select('.domain').remove();

  // Build color scale
  const myColor = d3.scaleLinear()
    .range(['white', '#4db6ac'])
    .domain([0, 10]);

  // add the squares
  svg
    .selectAll('rect')
    .data(data, function(d) {
      return d.hourOfDay + ':' + d.dayOfWeek;
    })
    .enter()
    .append('rect')
    .attr('x', function(d) {
      return x(d.hourOfDay);
    })
    .attr('y', function(d) {
      return y(d.dayOfWeek);
    })
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', function(d) {
      return myColor(d.numPosts);
    })
    .style('stroke-width', 4)
    .style('stroke', 'none');

  // Add subtitle to graph
  svg.append('text')
    .attr('x', 0)
    .attr('y', -20)
    .attr('text-anchor', 'left')
    .attr('class', 'MuiTypography-body2')
    .style('fill', 'grey')
    .style('max-width', 400)
    .text('A heatmap showing the number of top 500 Reddit posts posted during each day and hour of the week.');

  svg.append('text')
    .attr('text-anchor', 'middle')  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr('transform', 'translate(' + (-margin.left / 3 * 2) + ',' + (height / 2) + ')rotate(-90)')  // text is drawn off the screen top left, move down and out and rotate
    .text('Day of Week')
    .attr('class', 'MuiTypography-body2');

  svg.append('text')
    .attr('text-anchor', 'middle')  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr('transform', 'translate(' + (width / 2) + ',' + (height + (margin.bottom / 3 * 2)) + ')')  // centre below axis
    .text('Hour of Day (24 Hours) (UTC)')
    .attr('class', 'MuiTypography-body2');
}

export function renderLegend(ref2: React.MutableRefObject<null>, classes: ClassNameMap<string>) {
  const legendParent = d3.select(ref2.current);
  // append a defs (for definition) element to your SVG
  const svgLegend = legendParent.append('svg').attr('class', classes.legend);
  const defs = svgLegend.append('defs');

  // append a linearGradient element to the defs and give it a unique id
  const linearGradient = defs.append('linearGradient')
    .attr('id', 'linear-gradient');

  // horizontal gradient
  linearGradient
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');

  // append multiple color stops by using D3's data/enter step
  linearGradient.selectAll('stop')
    .data([
      { offset: '0%', color: 'white' },
      { offset: '100%', color: '#4db6ac' },
    ])
    .enter().append('stop')
    .attr('offset', function(d) {
      return d.offset;
    })
    .attr('stop-color', function(d) {
      return d.color;
    });
  // append title
  svgLegend.append('text')
    .attr('x', 0)
    .attr('y', 20)
    .style('text-anchor', 'left')
    .attr('class', 'MuiTypography-body2')
    .text('No. of posts');

  // draw the rectangle and fill with gradient
  svgLegend.append('rect')
    .attr('x', 0)
    .attr('y', 30)
    .attr('width', 300)
    .attr('height', 15)
    .style('fill', 'url(#linear-gradient)');

  //create tick marks
  const xLeg = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 300]);

  const axisLeg = d3.axisBottom(xLeg);

  svgLegend
    .append('g')
    .attr('transform', 'translate(0, 45)')
    .attr('class', 'MuiTypography-body3')
    .call(axisLeg);
}
