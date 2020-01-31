import React from 'react';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import * as d3 from 'd3';

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
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color);
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

  // create tick marks
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
