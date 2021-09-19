import React from 'react';
import { IssueItemProps } from 'src/types/issues';
import styles from './style.module.scss';

export const IssueItem: React.FC<IssueItemProps> = ({
  title,
  current,
  priority,
  editBtn,
  deleteBtn,
  columnMode,
  onClick,
}) => (
  <div
    className={`
      ${styles.issueCard} 
      ${current && styles.currentIssue} 
      ${columnMode && styles.column_mode}`}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex={0}
  >
    <div className={styles.issueInfo}>
      <span className={styles.current}>{current && 'current'}</span>
      <span className={styles.title}>{title}</span>
      <span className={styles.priority}>
        {priority}
        {' '}
        priority
      </span>
    </div>
    <div>
      {editBtn}
      {deleteBtn}
    </div>
  </div>
);

IssueItem.defaultProps = {
  columnMode: false,
};

export default IssueItem;
