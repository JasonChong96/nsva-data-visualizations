/**
 *
 * TopRedditPostsBarChartEncodingTable
 *
 */
import React from 'react';
import { DataEncodingInfo } from '../../types/dataviz';
import { createDataEncodingInfo } from '../../utils/encodingHelper';
import DataEncodingTable from '../DataEncodingTable';

// import styled from 'styles/styled-components';

interface Props {}

const dataEncoding: DataEncodingInfo[] = [
  createDataEncodingInfo('No. of Posts',
    'Quantitative',
    'Height',
    'The height of the bar shows the number of top 500 posts made on a given day of the week.'),
  createDataEncodingInfo('Day of Week',
    'Ordinal',
    'Position',
    'The x-axis shows the day of the week.'),
];

function TopRedditPostsBarChartEncodingTable(props: Props) {
  return <DataEncodingTable dataEncoding={dataEncoding}/>;
}

export default TopRedditPostsBarChartEncodingTable;
