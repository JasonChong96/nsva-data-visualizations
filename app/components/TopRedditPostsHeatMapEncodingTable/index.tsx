/**
 *
 * TopRedditPostsHeatMapEncodingTable
 *
 */
import React from 'react';
import DataEncodingTable from '../DataEncodingTable';
import { DataEncodingInfo } from '../../types/dataviz';
import { createDataEncodingInfo } from '../../utils/encodingHelper';

// import styled from 'styles/styled-components';

interface Props {
}

const dataEncoding: DataEncodingInfo[] = [
  createDataEncodingInfo('Day of Week',
    'Ordinal',
    'Position',
    'The y-axis shows the day of the week.'),
  createDataEncodingInfo('Hour',
    'Ordinal',
    'Position',
    'The x-axis shows the hour of the day (in 24 hours).'),
  createDataEncodingInfo('Number of Top 500 Posts Created',
    'Quantitative',
    'Color',
    'The heat map uses the color legend to show the number of top 500 posts created.'),
];

function TopRedditPostsHeatMapEncodingTable(props: Props) {
  return <DataEncodingTable dataEncoding={dataEncoding}/>;
}

// @ts-ignore
export default TopRedditPostsHeatMapEncodingTable;
