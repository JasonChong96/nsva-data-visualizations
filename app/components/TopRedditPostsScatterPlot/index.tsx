/**
 *
 * TopRedditPostsScatterPlot
 *
 */
import React from 'react';
import * as d3 from 'd3';
import { Post } from '../../containers/TopRedditPosts';
import { linearRegression, linearRegressionLine, rSquared } from 'simple-statistics';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

// import styled from 'styles/styled-components';

interface Props {
  data: Post[];
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  regressionLine: {
    stroke: '#26a69a',
    fill: 'none',
    strokeWidth: 1.2,
    strokeDasharray: 3.5,
  },
}));

function TopRedditPostsScatterPlot({ data }: Props) {
  const ref = React.useRef(null);
  const classes = useStyles();
  React.useEffect(() => {
    if (!ref.current || data.length === 0) {
      return;
    }

    d3.select(ref.current).selectAll('svg').remove();
    const height = 600;
    const width = 700;
    const svg = d3.select(ref.current).append('svg');
    svg.attr('height', height)
      .attr('width', width);
    const margin = { top: 50, right: 20, bottom: 50, left: 50 };
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.comm)])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.score)]) // added a bit of breathing room (1)
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g.attr('transform', `translate(0, ${height - margin.bottom})`)
      .attr('class', 'xAxis')
      .call(d3.axisBottom(xScale));

    const yAxis = g => g.attr('transform', `translate(${margin.left}, 0)`)
      .attr('class', 'yAxis')
      .call(d3.axisLeft(yScale));
    const regression = linearRegression(data.map(d => [+d.comm, +d.score]));
    const regressionLine = linearRegressionLine(regression);
    const rSquare = rSquared(data.map(d => [+d.comm, +d.score]), regressionLine);
    const firstX = d3.min(data, d => +d.comm);
    const lastX = d3.max(data, d => +d.comm);
    const xCoordinates = [firstX, lastX];
    const regressionPoints = xCoordinates.map(d => ({
      x: +d,                         // We pick x and y arbitrarily, just make sure they match d3.line accessors
      y: regressionLine(+d),
    }));
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));
    const renderChart = (target) => {
      // First, let's make the scatterplot
      target.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('r', 3)
        .attr('cx', d => xScale(d.comm))
        .attr('cy', d => yScale(d.score));

      // Next, we'll draw the regression line
      target.append('path')
        .classed(classes.regressionLine, true)
        .datum(regressionPoints)
        .attr('d', line);

      // Lastly, we add the axes!
      target.append('g')
        .call(xAxis);
      target.append('g')
        .call(yAxis);

      target
        .append('text')
        .attr('fill', '#000')
        .attr('x', '6rem')
        .attr('y', '2rem')
        .attr('class', 'MuiTypography-body1')
        .attr('text-anchor', 'end')
        .text('No. of Votes');


      target.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', height - margin.bottom / 4)
        .attr('x', (width) / 2)
        .text('No. of Comments')
        .attr('class', 'MuiTypography-body1');
    };
    renderChart(svg);

  }, [ref.current, data]);

  return <div ref={ref}/>;
}

export default TopRedditPostsScatterPlot;
