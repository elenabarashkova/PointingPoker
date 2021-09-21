import IssueItem from 'components/shared/IssueItem';
import React from 'react';
import { IssueStatus } from 'src/types/issues';
import { useSortedIssues } from '../hooks/useSortedIssues';
import styles from './style.module.scss';

export const IssueList: React.FC = () => {
  const { sortedIssues } = useSortedIssues();

  return (
    <div className={styles.issueList}>
      {sortedIssues.map(({
        id, title, priority, status, 
      }) => (
        <IssueItem
          key={`issue-${id}`}
          title={title}
          priority={priority}
          current={status === IssueStatus.active}
          columnMode
        />
      ))}
    </div>
  );
}; 
