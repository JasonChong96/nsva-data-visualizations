/*
 *
 * TopRedditPosts reducer
 *
 */

import ActionTypes from './constants';
import { ContainerActions, ContainerState } from './types';

export const initialState: ContainerState = {
  default: null,
};

function topRedditPostsReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default topRedditPostsReducer;
