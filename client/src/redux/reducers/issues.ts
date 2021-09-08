import { PayloadAction } from '@reduxjs/toolkit';
import { SET_ISSUES } from '../action-types';
import { Issue, Issues } from '../../types/issues';

export const initialState = {
  error: false,
  isLoading: false,
  issues: [],
};

export const issues = (
  state: Issues = initialState,
  { type, payload }: PayloadAction<Array<Issue> | Issue | boolean>,
): Issues => {
  if (type === SET_ISSUES) {
    return {
      ...state,
      issues: payload as Array<Issue>,
    };
  }

  return state;
};
