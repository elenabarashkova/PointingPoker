import CreateIssue from 'components/issues/CreateIssue';
import { IssueCard } from 'components/issues/IssueCard';
import {
  CREATE_ISSUE_FORM_CONFIG,
  ISSUE_PRIORITY_CONFIG,
} from 'components/issues/IssueModals/config';
import { CreateIssueModal } from 'components/issues/IssueModals/CreateIssueModal';
import { UpdateIssueModal } from 'components/issues/IssueModals/UpdateIssueModal';
import React from 'react';
import { IssueStatus, IssueToolsProps } from 'src/types/issues';
import { useSortedIssues } from '../hooks/useSortedIssues';
import styles from './style.module.scss';
import { useIssueTools } from './useIssueTools';

const IssueTools: React.FC<IssueToolsProps> = ({ editMode, columnMode }) => {
  const {
    createIssueModalIsOpen,
    updateIssueModalIsOpen,
    editIssueValues,
    isLoading,
    editBtnAction,
    deleteBtnAction,
    sendBtnAction,
    openCreateIssueModal,
    closeCreateIssueModal,
    closeUpdateIssueModal,
    startRound,
    isCompleted,
    voteMode,
    finalVoteInputAction,
  } = useIssueTools();

  const { sortedIssues } = useSortedIssues();

  return (
    <div className={`${styles.row_wrapper} ${columnMode && styles.column_wrapper}`}>
      <div className={styles.title}>Issues:</div>
      <div className={`${styles.issuesList} ${columnMode && styles.column}`}>
        {sortedIssues.map(({
          id, title, priority, status, link, 
        }) => (
          <IssueCard
            key={id}
            id={id}
            title={title}
            priority={priority}
            current={status === IssueStatus.active}
            editMode={editMode}
            voteMode={voteMode(id)}
            columnMode={columnMode}
            isCompleted={isCompleted(id)}
            isSending={isLoading}
            onClick={startRound(id)}
            inputAction={finalVoteInputAction}
            sendBtnAction={sendBtnAction(id)}
            deleteBtnAction={deleteBtnAction(id)}
            editBtnAction={editBtnAction(title, link, priority, id)}
          />
        ))}
        <CreateIssue addBtnAction={openCreateIssueModal} columnMode={columnMode} />
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
