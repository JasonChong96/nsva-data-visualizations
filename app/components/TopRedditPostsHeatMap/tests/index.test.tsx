/**
 *
 * Tests for TopRedditPostsHeatMap
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import TopRedditPostsHeatMap from '../index';
// import 'jest-dom/extend-expect'; // add some helpful assertions

describe('<TopRedditPostsHeatMap />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<TopRedditPostsHeatMap data={[]}/>);
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
    } = render(<TopRedditPostsHeatMap data={[]}/>);
    expect(firstChild).toMatchSnapshot();
  });
});
