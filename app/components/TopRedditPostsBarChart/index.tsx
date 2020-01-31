/**
 *
 * TopRedditPostsBarChart
 *
 */
import React from 'react';
import * as d3 from 'd3';
import { HeatMapDataPoint } from '../../containers/TopRedditPosts';
import { getDayName } from '../../utils/dateHelper';

// import styled from 'styles/styled-components';

interface Props {
  data: HeatMapDataPoint[];
}

function TopRedditPostsBarChart(props: Props) {
  const { data } = props;
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    d3.select(ref.current).selectAll('svg').remove();
    const svg = d3.select(ref.current).append('svg');
    svg.attr('height', '500').attr('width', '800');
    const margin = {
      top: 20,
      right: 20,
      bottom: 100,
      left: 50,
    };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const groupedData = d3.nest()
      .key(d => d.dayOfWeek)
      .rollup(row => ({
        total: d3.sum(row, d => d.numPosts),
        dayOfWeek: d3.mean(row, d => d.dayOfWeek),
      }))
      .entries(data)
      .map(Object.values)
      .map(x => x[1]);
    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.35);
    const y = d3.scaleLinear()
      .rangeRound([height, 0]);

    x.domain(groupedData.map(d => d.dayOfWeek));
    y.domain([0, d3.max(groupedData, d => Number(d.total))]);

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'MuiTypography-body2')
      .call(d3.axisBottom(x).tickFormat(getDayName));

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('x', '3rem')
      .attr('y', '-0.5rem')
      .attr('class', 'MuiTypography-body2')
      .attr('text-anchor', 'end')
      .text('No. of Posts');


    g.append('text')
      .attr('text-anchor', 'middle')  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr('y', height + margin.bottom / 2)  // text is drawn off the screen top left, move down and out and rotate
      .attr('x', (width) / 2)
      .text('Day of Week')
      .attr('class', 'MuiTypography-body1');

    g.selectAll('.bar')
      .data(groupedData)
      .enter().append('rect')
      .attr('fill', '#80cbc4')
      .attr('class', 'bar')
      .attr('x', d => x(d.dayOfWeek))
      .attr('y', d => y(Number(d.total)))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(Number(d.total)))
      .on('mouseover', function(this: object, d) {
        d3.select(this).attr('r', 10).style('fill', '#4db6ac');
      })
      .on('mouseout', function(this: object, d) {
        d3.select(this).attr('r', 5.5).style('fill', '#80cbc4');
      });
  }, [ref.current, data]);
  return <div ref={ref}/>;
}

export default TopRedditPostsBarChart;
