/**
 *
 * Tests for TopRedditPostsScatterPlot
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import TopRedditPostsScatterPlot from '../index';
// import 'jest-dom/extend-expect'; // add some helpful assertions

describe('<TopRedditPostsScatterPlot />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<TopRedditPostsScatterPlot data={[]}/>);
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
    } = render(<TopRedditPostsScatterPlot data={[]}/>);
    expect(firstChild).toMatchSnapshot();
  });
});
