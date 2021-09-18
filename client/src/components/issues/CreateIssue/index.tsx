import { AddButton } from 'components/shared/buttons/AddButton';
import React from 'react';
import { CreateIssueProps } from 'src/types/issues';
import styles from './style.module.scss';

export const CreateIssue: React.FC<CreateIssueProps> = ({ addBtnAction }) => (
  <div className={styles.createIssue}>
    <p>Create new Issue</p>
    <AddButton onClick={addBtnAction} />
  </div>
);
