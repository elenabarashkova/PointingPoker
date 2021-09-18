import { ExtendedIssue, Issues } from 'src/types/issues';

export const sortByDate = (issues: Issues): ExtendedIssue[] => Object.entries(issues)
  .map(([id, issue]) => ({ id, ...issue }))
  .sort((a, b) => a.date - b.date);
