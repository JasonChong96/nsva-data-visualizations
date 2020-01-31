import topRedditPostsReducer from '../reducer';
// import { someAction } from '../actions';
import { ContainerState } from '../types';

describe('topRedditPostsReducer', () => {
  let state: ContainerState;
  beforeEach(() => {
    state = {
      default: null,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(topRedditPostsReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = {
   *     loading = true;
   *   );
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
