import * as d3 from 'd3';
import { HeatMapDataPoint } from '../../containers/TopRedditPosts';
import React from 'react';
import { getDayName } from '../../utils/dateHelper';

export function renderHeatMap(parent: any,
                              width: number,
                              margin: { top: number; left: number; bottom: number; right: number },
                              height: number,
                              data: HeatMapDataPoint[]) {
  // append the svg object to the body of the page
  const svg = parent
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')');

  // Read the data
  const myGroups = d3.map(data, d => d.hourOfDay).keys();
  const myVars = d3.map(data, d => d.dayOfWeek).keys();
  // Build X scales and axis:
  const x = d3.scaleBand()
    .range([0, width])
    .domain(myGroups)
    .padding(0.05);
  svg.append('g')
    .attr('class', 'MuiTypography-body2')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickSize(0))
    .select('.domain').remove();

  // Build Y scales and axis:
  const y = d3.scaleBand()
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
    .data(data, d => d.hourOfDay + ':' + d.dayOfWeek)
    .enter()
    .append('rect')
    .attr('x', d => x(d.hourOfDay))
    .attr('y', d => y(d.dayOfWeek))
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', d => myColor(d.numPosts))
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
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + (-margin.left / 3 * 2) + ',' + (height / 2) + ')rotate(-90)')
    .text('Day of Week')
    .attr('class', 'MuiTypography-body2');

  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height + (margin.bottom / 3 * 2)) + ')')
    .text('Hour of Day (24 Hours) (UTC)')
    .attr('class', 'MuiTypography-body2');
}

