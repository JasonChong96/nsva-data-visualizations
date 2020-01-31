/*
 *
 * TopRedditPosts actions
 *
 */

import { action } from 'typesafe-actions';

import ActionTypes from './constants';

export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
