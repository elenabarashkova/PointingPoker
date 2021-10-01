import React from 'react';
import { IssueItemProps } from 'src/types/issues';
import LinkButton from '../buttons/LinkButton';
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
  gameMode,
  link,
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
      <div className={styles.top}>
        <LinkButton link={link} current={current} />
        <span className={styles.current}>{current && 'current'}</span>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.priority}>
        {priority}
        {' '}
        priority
      </div>
    </div>
    <div className={styles.buttons_wrapper}>
      <div>{gameMode && !voteMode && !finalVote && <span className={styles.dash}>—</span>}</div>
      <div>{gameMode && finalVote}</div>
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
  gameMode: false,
};

export default IssueItem;
