import React from 'react';
import { IssueItemProps } from 'src/types/issues';
import styles from './style.module.scss';

export const IssueItem: React.FC<IssueItemProps> = ({
  title,
  current,
  priority,
  editBtn,
  deleteBtn,
  finalVote,
  input,
  columnMode,
  notClickable,
  voteMode,
  onClick,
}) => (
  <div
    className={`
      ${styles.issue_card} 
      ${current && styles.current_issue} 
      ${columnMode && styles.column_mode}
      ${notClickable && styles.not_clickable}`}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex={0}
  >
    <div className={styles.issue_info}>
      <span className={styles.current}>{current && 'current'}</span>
      <span className={styles.title}>{title}</span>
      <span className={styles.priority}>
        {priority}
        {' '}
        priority
      </span>
    </div>
    <div className={styles.buttons_wrapper}>
      <div>{finalVote}</div>
      {voteMode && input}
      {editBtn}
      {deleteBtn}
    </div>
  </div>
);

IssueItem.defaultProps = {
  columnMode: false,
  notClickable: false,
  voteMode: false,
};

export default IssueItem;
