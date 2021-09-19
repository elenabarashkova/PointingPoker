import IssueItem from 'components/shared/IssueItem';
import React from 'react';
import { IssueListProps } from 'src/types/issues';
import styles from './style.module.scss';

export const IssueList: React.FC<IssueListProps> = ({ sortedIssues }) => (
  <div className={styles.issueList}>
    {sortedIssues.map(({
      id, title, priority, current, 
    }) => (
      <IssueItem key={`issue-${id}`} title={title} priority={priority} current={current} />
    ))}
  </div>
);
