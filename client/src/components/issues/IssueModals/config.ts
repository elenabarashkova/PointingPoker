import { FormConfig, IssuePriority } from 'src/types/issues';

export const CREATE_ISSUE_FORM_CONFIG: FormConfig = {
  issueTitle: {
    type: 'text',
    placeholder: '',
    label: 'Title:',
    errorText: 'Please fill in this field',
    regExp: /\S/,
    maxLength: 30,
  },
  issueLink: {
    type: 'text',
    placeholder: '',
    label: 'Link:',
    errorText: 'Please enter a valid URL',
    regExp: /^(http|https):\/\/[^ "]+$/,
    maxLength: 100,
  },
  issuePriority: {
    type: 'select',
    placeholder: '',
    label: 'Priority:',
    errorText: 'Please select issue priority',
    regExp: /\S/,
    maxLength: undefined,
  },
};

export const ISSUE_PRIORITY_CONFIG = [IssuePriority.low, IssuePriority.middle, IssuePriority.hight];
