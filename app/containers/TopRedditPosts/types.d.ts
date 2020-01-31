import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface TopRedditPostsState {
  readonly default: any;
}

/* --- ACTIONS --- */
type TopRedditPostsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = TopRedditPostsState;
type ContainerActions = TopRedditPostsActions;

export { RootState, ContainerState, ContainerActions };
