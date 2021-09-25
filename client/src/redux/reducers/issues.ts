import { AnyAction } from '@reduxjs/toolkit';
import { IssuesStore } from '../../types/issues';
import {
  ADD_ISSUE,
  DELETE_ISSUE,
  SEND_REQUEST,
  SET_ERROR,
  SET_ISSUES,
  UPDATE_ISSUE,
} from '../action-types';

export const initialState: IssuesStore = {
  error: false,
  isLoading: false,
  issues: {},
  issuesCounter: 1,
};

export const issuesStore = (
  state: IssuesStore = initialState,
  { type, payload }: AnyAction,
): IssuesStore => {
  switch (type) {
    case SEND_REQUEST:
      return { ...state, isLoading: true, error: false };
    case SET_ERROR:
      return { ...state, isLoading: false, error: true };
    case SET_ISSUES:
      return {
        ...state,
        issues: { ...payload },
        isLoading: false,
        error: false,
      };
    case ADD_ISSUE:
      return {
        ...state,
        issues: { ...state.issues, [payload.issueId]: payload.issue },
        issuesCounter: state.issuesCounter + 1,
        isLoading: false,
        error: false,
      };
    case UPDATE_ISSUE:
      return {
        ...state,
        issues: { ...state.issues, [payload.issueId]: payload.issue },
        isLoading: false,
        error: false,
      };
    case DELETE_ISSUE:
      return {
        ...state,
        issues: Object.fromEntries(Object.entries(state.issues).filter(([key]) => key !== payload)),
        isLoading: false,
        error: false,
      };
    default:
      return state;
  }
};
