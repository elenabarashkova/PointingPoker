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
      <div className={styles.title}>Issues:</div>
      {sortedIssues.map(({
        id, title, priority, status, link, 
      }) => (
        <IssueItem
          key={id}
          title={title}
          gameMode
          priority={priority}
          link={link}
          current={status === IssueStatus.active}
          columnMode
          notClickable
          finalVote={voting[id]?.finalVote}
        />
      ))}
    </div>
  );
};
