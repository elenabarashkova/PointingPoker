import IssueItem from 'components/shared/IssueItem';
import React from 'react';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { IssueStatus } from 'src/types/issues';
import { useSortedIssues } from '../hooks/useSortedIssues';
import styles from './style.module.scss';

export const IssueList: React.FC = () => {
  const { sortedIssues } = useSortedIssues();
  const { voting } = useTypedSelector((store) => store);

  return (
    <div className={styles.issue_list}>
      {sortedIssues.map(({
        id, title, priority, status, 
      }) => (
        <IssueItem
          key={`issue-${id}`}
          title={title}
          priority={priority}
          current={status === IssueStatus.active}
          columnMode
          notClickable
          finalVote={voting[id]?.finalVote}
        />
      ))}
    </div>
  );
};
