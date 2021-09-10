import { Issues } from 'src/types/issues';

export const getNextIssueNumber = (issues: Issues): number => Object.keys(issues).length + 1;
