/**
 *
 * TopRedditPostsHeatMap
 *
 */
import React from 'react';
import * as d3 from 'd3';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { HeatMapDataPoint } from '../../containers/TopRedditPosts';
import { renderHeatMap, renderLegend } from './render';

// import styled from 'styles/styled-components';

interface Props {
  data: HeatMapDataPoint[],
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  legend: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    overflow: 'inherit !important',
  },
}));


function TopRedditPostsHeatMap(props: Props) {
  const ref = React.useRef(null);
  const ref2 = React.useRef(null);
  const classes = useStyles();
  const { data } = props;



  React.useEffect(() => {
    if (!ref.current || data.length == 0) {
      return;
    }
    const parent = d3.select(ref.current);
    const legendParent = d3.select(ref2.current);

    parent.selectAll("svg").remove();
    legendParent.selectAll("svg").remove();
    // set the dimensions and margins of the graph
    const margin = { top: 80, right: 25, bottom: 60, left: 150 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    renderHeatMap(parent, width, margin, height, data);

    renderLegend(ref2, classes);
  }, [data, ref.current]);
  return <>
    <div ref={ref}/>
    <div ref={ref2}/>
  </>;
}

export default TopRedditPostsHeatMap;
