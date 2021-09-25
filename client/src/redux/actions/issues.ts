import {
  Action, AnyAction, Dispatch, PayloadAction, 
} from '@reduxjs/toolkit';
import { addIssue } from 'src/services/issues/addIssue';
import { deleteIssue } from 'src/services/issues/deleteIssue';
import { updateIssue } from 'src/services/issues/updateIssue';
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

export const deleteIssueAction = (issueId: string): PayloadAction<string> => ({
  type: DELETE_ISSUE,
  payload: issueId,
});

export const sendIssuesRequest = (): Action => ({
  type: SEND_REQUEST,
});

export const setIssuesError = (): Action => ({
  type: SET_ERROR,
});

export const addIssueRequest = (roomId: string, issue: Issue) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    dispatch(sendIssuesRequest());
    const response = await addIssue(roomId, issue);
    dispatch(addIssueAction(response));
  } catch (error) {
    dispatch(setIssuesError());
  }
};

export const deleteIssueRequest = (roomId: string, issueId: string) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    dispatch(sendIssuesRequest());
    const response = await deleteIssue(roomId, issueId);
    dispatch(deleteIssueAction(response));
  } catch (error) {
    dispatch(setIssuesError());
  }
};

export const updateIssueRequest = (roomId: string, issueId: string, issue: Issue) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    dispatch(sendIssuesRequest());
    const response = await updateIssue(roomId, issueId, issue);
    dispatch(updateIssueAction(response));
  } catch (error) {
    dispatch(setIssuesError());
  }
};
