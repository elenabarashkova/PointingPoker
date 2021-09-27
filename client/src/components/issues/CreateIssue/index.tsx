import React from 'react';
import { CreateIssueProps } from 'src/types/issues';
import styles from './style.module.scss';

export const CreateIssue: React.FC<CreateIssueProps> = ({ addBtnAction, additionalStyle }) => (
  <button
    type="button"
    className={`${styles.createIssue} ${additionalStyle}`}
    onClick={addBtnAction}
  >
    <p>Create new Issue</p>
  </button>
);
