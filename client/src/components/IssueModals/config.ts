import { FormConfig, IssuePriority } from 'src/types/issues';

export const CREATE_ISSUE_FORM_CONFIG: FormConfig = {
  issueTitle: {
    type: 'text',
    placeholder: '',
    label: 'Title:',
    errorText: 'Please fill in this field',
    regExp: /\S/,
  },
  issueLink: {
    type: 'text',
    placeholder: '',
    label: 'Link:',
    errorText: 'Please enter a valid URL',
    regExp: /^(http|https):\/\/[^ "]+$/,
  },
  issuePriority: {
    type: 'select',
    placeholder: '',
    label: 'Link:',
    errorText: 'Please select issue priority',
    regExp: /\S/,
  },
};

export const ISSUE_PRIORITY_CONFIG = [IssuePriority.low, IssuePriority.middle, IssuePriority.hight];
