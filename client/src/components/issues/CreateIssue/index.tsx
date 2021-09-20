import { AddButton } from 'components/shared/buttons/AddButton';
import React from 'react';
import { CreateIssueProps } from 'src/types/issues';
import styles from './style.module.scss';

const CreateIssue: React.FC<CreateIssueProps> = ({ addBtnAction, columnMode }) => (
  <div className={`${styles.createIssue} ${columnMode && styles.column_mode}`}>
    <p>Create new Issue</p>
    <AddButton onClick={addBtnAction} />
  </div>
);

CreateIssue.defaultProps = {
  columnMode: false,
};

export default CreateIssue;
