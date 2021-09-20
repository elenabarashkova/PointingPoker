import { useMemo } from 'react';
import { sortByDate } from 'src/helpers/sortByDate';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { ExtendedIssue } from 'src/types/issues';

export const useSortedIssues = (): { sortedIssues: ExtendedIssue[] } => {
  const { issues } = useTypedSelector((store) => store.issuesStore);
  const sortedIssues = useMemo(() => sortByDate(issues), 
    [issues]);

  return { sortedIssues };
};
