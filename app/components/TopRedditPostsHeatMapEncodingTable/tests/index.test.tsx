/**
 *
 * Tests for TopRedditPostsHeatMapEncodingTable
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import TopRedditPostsHeatMapEncodingTable from '../index';

describe('<TopRedditPostsHeatMapEncodingTable />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<TopRedditPostsHeatMapEncodingTable />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<TopRedditPostsHeatMapEncodingTable />);
    expect(firstChild).toMatchSnapshot();
  });
});
