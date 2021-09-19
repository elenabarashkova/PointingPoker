import { CreateIssue } from 'components/issues/CreateIssue';
import { IssueCard } from 'components/issues/IssueCard';
import {
  CREATE_ISSUE_FORM_CONFIG,
  ISSUE_PRIORITY_CONFIG,
} from 'components/issues/IssueModals/config';
import { CreateIssueModal } from 'components/issues/IssueModals/CreateIssueModal';
import { UpdateIssueModal } from 'components/issues/IssueModals/UpdateIssueModal';
import React from 'react';
import { IssueToolsProps } from 'src/types/issues';
import styles from './style.module.scss';
import { useIssueTools } from './useIssueTools';

const IssueTools: React.FC<IssueToolsProps> = ({ editMode, columnMode }) => {
  const {
    createIssueModalIsOpen,
    updateIssueModalIsOpen,
    editIssueValues,
    sortedIssues,
    editBtnAction,
    deleteBtnAction,
    openCreateIssueModal,
    closeCreateIssueModal,
    closeUpdateIssueModal,
    activateIssue,
  } = useIssueTools();

  return (
    <div className={`${styles.row_wrapper} ${columnMode && styles.column_wrapper}`}>
      <div className={styles.title}>Issues:</div>
      <div className={`${styles.issuesList} ${columnMode && styles.column}`}>
        {sortedIssues.map(({
          id, title, priority, current, link, 
        }) => (
          <IssueCard
            key={`issue-card-${id}`}
            id={id}
            title={title}
            priority={priority}
            current={current}
            editMode={editMode}
            onClick={activateIssue(id)}
            deleteBtnAction={deleteBtnAction(id)}
            editBtnAction={editBtnAction(title, link, priority, id)}
          />
        ))}
        <CreateIssue addBtnAction={openCreateIssueModal} />
      </div>
      <CreateIssueModal
        isOpen={createIssueModalIsOpen}
        noBtnAction={closeCreateIssueModal}
        config={CREATE_ISSUE_FORM_CONFIG}
        options={ISSUE_PRIORITY_CONFIG}
      />
      {updateIssueModalIsOpen && (
        <UpdateIssueModal
          isOpen={updateIssueModalIsOpen}
          noBtnAction={closeUpdateIssueModal}
          config={CREATE_ISSUE_FORM_CONFIG}
          options={ISSUE_PRIORITY_CONFIG}
          title={editIssueValues.title}
          url={editIssueValues.url}
          priority={editIssueValues.priority}
          issueId={editIssueValues.id}
        />
      )}
    </div>
  );
};

IssueTools.defaultProps = {
  editMode: true,
  columnMode: false,
};

export default IssueTools;
