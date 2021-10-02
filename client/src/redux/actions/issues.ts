import {
  Action, AnyAction, Dispatch, PayloadAction,
} from '@reduxjs/toolkit';
import { SetStateAction } from 'react';
import {
  createCommonNotificationAboutIssue,
  IssueNotFoundNotification,
} from 'src/helpers/commonNotifications';
import { ResponseStatus } from 'src/services/constants';
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
import { setCommonNotification } from './notifications';

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

const handleIssueActionError = (dispatch: Dispatch<AnyAction>): void => {
  const notification = createCommonNotificationAboutIssue();
  dispatch(setCommonNotification(notification));
};

export const addIssueRequest = (
  roomId: string, 
  issue: Issue,
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    dispatch(sendIssuesRequest());
    const response = await addIssue(roomId, issue);
    dispatch(addIssueAction(response));
  } catch (error) {
    dispatch(setIssuesError());
    handleIssueActionError(dispatch);
  }
};

export const deleteIssueRequest = (
  roomId: string, 
  issueId: string,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    setIsLoading(true);
    const { status, data } = await deleteIssue(roomId, issueId);

    if (status === ResponseStatus.ok) {
      dispatch(deleteIssueAction(data));
    } else {
      const notification = IssueNotFoundNotification();
      dispatch(setCommonNotification(notification));
    }
  } catch (error) {
    handleIssueActionError(dispatch);
  } finally {
    setIsLoading(false);
  }
};

export const updateIssueRequest = (
  roomId: string, 
  issueId: string, 
  issue: Issue,
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    dispatch(sendIssuesRequest());
    const response = await updateIssue(roomId, issueId, issue);
    dispatch(updateIssueAction(response));
  } catch (error) {
    dispatch(setIssuesError());
    handleIssueActionError(dispatch);
  }
};
