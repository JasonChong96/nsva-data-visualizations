/**
 *
 * TopRedditPostsScatterPlotEncodingTable
 *
 */
import React from 'react';
import { DataEncodingInfo } from '../../types/dataviz';
import { createDataEncodingInfo } from '../../utils/encodingHelper';
import DataEncodingTable from '../DataEncodingTable';

// import styled from 'styles/styled-components';

interface Props {}

const dataEncoding: DataEncodingInfo[] = [
  createDataEncodingInfo('No. of Votes',
    'Quantitative',
    'Position',
    'The y-axis shows the number of votes on a post.'),
  createDataEncodingInfo('No. of Comments',
    'Quantitative',
    'Position',
    'The x-axis shows the number of comments on a post.'),
];

function TopRedditPostsScatterPlotEncodingTable(props: Props) {
  return <DataEncodingTable dataEncoding={dataEncoding}/>;
}

export default TopRedditPostsScatterPlotEncodingTable;
