import React from 'react';

export type IssueStatistics = Array<string>;
export type IssueVote = Array<string>;

enum IssueStatus {}

export interface Issue {
  title: string;
  theme: string;
  priority: keyof typeof IssuePriority;
  current?: boolean;
  statistics?: IssueStatistics;
  vote?: IssueVote;
}

export interface Issues {
  [id: string]: Issue;
}

export interface IssuesStore {
  error: boolean;
  isLoading: boolean;
  issues: Issues;
}

export interface IssueData {
  issueId: string;
  issue: Issue;
}

export enum IssuePriority {
  low = 'low',
  middle = 'middle',
  hight = 'hight',
}

export interface IssueProps {
  id: string;
  theme: string;
  title: string;
  current?: boolean;
  priority: keyof typeof IssuePriority;
}

export interface IssueItemProps extends IssueProps {
  editBtn?: React.ReactNode;
  deleteBtn?: React.ReactNode;
}

export interface IssueCardProps extends IssueProps {
  deleteBtnAction: () => void;
  editBtnAction: () => void;
}

export interface CreateIssueProps {
  addBtnAction: () => void;
}

export interface CreateIssueModalProps {
  isOpen: boolean;
}
