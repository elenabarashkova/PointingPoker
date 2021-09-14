import { CreateIssue } from 'components/issues/CreateIssue/inex';
import { IssueCard } from 'components/issues/IssueCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from 'src/types/store';
import styles from './style.module.scss';

export const IssueTools: React.FC = () => {
  const { issues } = useSelector((store: RootStore) => store.issues);

  const deleteBtnAction = () => console.log('update');
  const editBtnAction = () => console.log('edit');
  const addBtnAction = () => console.log('openModal');

  return (
    <div>
      <div className={styles.title}>Issues:</div>
      <div className={styles.issuesList}>
        {Object.entries(issues).map(([id, {
          title, theme, priority, current, 
        }]) => (
          <IssueCard
            key={`issue-${id}`}
            id={id}
            title={title}
            theme={theme}
            priority={priority}
            current={current}
            deleteBtnAction={deleteBtnAction}
            editBtnAction={editBtnAction}
          />
        ))}
        <CreateIssue addBtnAction={addBtnAction} />
      </div>
    </div>
  );
};
