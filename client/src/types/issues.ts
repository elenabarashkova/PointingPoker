import React, {
  ChangeEvent, Dispatch, MouseEvent, SetStateAction,
} from 'react';

export type IssueStatistics = Array<string>;
export type IssueVote = Array<string>;

export enum IssueStatus {
  pending = 'pending',
  active = 'active',
  finished = 'finished',
}

export interface Issue {
  title: string;
  link: string;
  priority: keyof typeof IssuePriority;
  status?: keyof typeof IssueStatus;
  statistics?: IssueStatistics;
  vote?: IssueVote;
  date?: number;
}
export interface ExtendedIssue extends Issue {
  id: string;
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
  id?: string;
  title: string;
  current?: boolean;
  priority: keyof typeof IssuePriority;
  columnMode?: boolean;
  onClick?: () => void;
}

export interface IssueItemProps extends IssueProps {
  editBtn?: React.ReactNode;
  deleteBtn?: React.ReactNode;
  disabled?: boolean;
  handleTitleChange?: () => void;
  handlePriorityChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface IssueCardProps extends IssueProps {
  editMode: boolean;
  deleteBtnAction: (event: MouseEvent) => void;
  editBtnAction: (event: MouseEvent) => void;
}

export interface CreateIssueProps {
  columnMode?: boolean;
  addBtnAction: () => void;
}

export interface FormConfig {
  [name: string]: {
    type: string;
    value?: string;
    label: string;
    placeholder: string;
    errorText: string;
    regExp: RegExp;
  };
}

export interface FormValues {
  [name: string]: {
    value: string;
    action: Dispatch<SetStateAction<string>>;
  };
}

export interface CreateIssueModalProps {
  isOpen: boolean;
  config: FormConfig;
  options: (keyof typeof IssuePriority)[];
  noBtnAction: () => void;
}

export interface UpdateIssueModalProps {
  isOpen: boolean;
  config: FormConfig;
  options: (keyof typeof IssuePriority)[];
  noBtnAction: () => void;
  title: string;
  url: string;
  priority: keyof typeof IssuePriority;
  issueId: string;
}

export interface IssueModalProps {
  isOpen: boolean;
  config: FormConfig;
  options: (keyof typeof IssuePriority)[];
  handleChange: (
    setValue: Dispatch<SetStateAction<string>>
  ) => (name: string, value: string) => void;
  handleSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
  closeModal: () => void;
  addNewIssue: () => void;
  valuesConfig: FormValues;
  errors: ErrorsConfig;
  isLoading: boolean;
}

export interface ErrorsConfig {
  [inputName: string]: boolean;
}

export interface UseValidation {
  validateField: (name: string, value: string) => void;
  formIsValid: (values: FormValues) => boolean;
  resetErrors: () => void;
  errors: ErrorsConfig;
}

export interface UseIssueModal {
  handleChange: (
    setValue: Dispatch<SetStateAction<string>>
  ) => (name: string, value: string) => void;
  handleSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
  closeModal: () => void;
  addNewIssue?: () => void;
  updateIssue?: () => void;
  valuesConfig: FormValues;
  errors: ErrorsConfig;
  isLoading: boolean;
}

export interface EditIssueValues {
  title?: string | undefined;
  url?: string | undefined;
  priority?: keyof typeof IssuePriority | undefined;
  id: string;
}

export interface UseIssueTools {
  createIssueModalIsOpen: boolean;
  updateIssueModalIsOpen: boolean;
  editIssueValues: EditIssueValues;
  editBtnAction: (
    title: string,
    url: string,
    priority: keyof typeof IssuePriority,
    id: string
  ) => (event: MouseEvent) => void;
  deleteBtnAction: (id: string) => (event: MouseEvent) => void;
  activateIssue: (id: string) => () => void;
  openCreateIssueModal: () => void;
  closeCreateIssueModal: () => void;
  closeUpdateIssueModal: () => void;
}

export interface IssueToolsProps {
  editMode?: boolean;
  columnMode?: boolean;
}
