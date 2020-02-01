/**
 *
 * DataEncodingTable
 *
 */
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { DataEncodingInfo } from '../../types/dataviz';

// import styled from 'styles/styled-components';

interface Props {
  dataEncoding: DataEncodingInfo[];
}

function DataEncodingTable({ dataEncoding }: Props) {
  return (
    <Table size="small">
      <caption>A table showing how data has been encoding in the above visualization.</caption>
      <TableHead>
        <TableRow>
          <TableCell>Data</TableCell>
          <TableCell>Data Type</TableCell>
          <TableCell>Encoding</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataEncoding.map(row => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.encoding}</TableCell>
            <TableCell>{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataEncodingTable;
