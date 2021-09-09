import {
  Action, AnyAction, Dispatch, PayloadAction, 
} from '@reduxjs/toolkit';
import { addIssue } from 'src/services/issues/addIssue';
import { Issue, IssueData, Issues } from 'src/types/issues';
import {
  ADD_ISSUE,
  DELETE_ISSUE,
  SEND_REQUEST,
  SET_ERROR,
  SET_ISSUES,
  UPDATE_ISSUE,
} from '../action-types';

export const setIssuesAction = (issues: Issues): PayloadAction<Issues> => ({
  type: SET_ISSUES,
  payload: issues,
});

export const addIssueAction = (data: IssueData): PayloadAction<IssueData> => ({
  type: ADD_ISSUE,
  payload: data,
});

export const updateIssueAction = (data: IssueData): PayloadAction<IssueData> => ({
  type: UPDATE_ISSUE,
  payload: data,
});

export const deleteIssueAction = (data: IssueData): PayloadAction<IssueData> => ({
  type: DELETE_ISSUE,
  payload: data,
});

export const sendIssuesRequest = (): Action => ({
  type: SEND_REQUEST,
});

export const setIssuesError = (): Action => ({
  type: SET_ERROR,
});

export const addIssueRequest = (roomId: string, issue: Issue) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(sendIssuesRequest());
    const response = await addIssue(roomId, issue);
    console.log(response);
    dispatch(addIssueAction(response));
  } catch (error) {
    dispatch(setIssuesError());
  }
};
