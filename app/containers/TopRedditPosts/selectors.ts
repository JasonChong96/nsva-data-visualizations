import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the topRedditPosts state domain
 */

const selectTopRedditPostsDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopRedditPosts
 */

const makeSelectTopRedditPosts = () =>
  createSelector(
    selectTopRedditPostsDomain,
    substate => {
      return substate;
    },
  );

export default makeSelectTopRedditPosts;
export { selectTopRedditPostsDomain };
