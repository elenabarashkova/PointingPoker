import { CreateIssue } from 'components/CreateIssue';
import { IssueCard } from 'components/IssueCard';
import { CREATE_ISSUE_FORM_CONFIG, ISSUE_PRIORITY_CONFIG } from 'components/IssueModals/config';
import { CreateIssueModal } from 'components/IssueModals/CreateIssueModal';
import { UpdateIssueModal } from 'components/IssueModals/UpdateIssueModal';
import React from 'react';
import { IssueToolsProps } from 'src/types/issues';
import styles from './style.module.scss';
import { useIssueTools } from './useIssueTools';

const IssueTools: React.FC<IssueToolsProps> = ({ editMode, columnMode }) => {
  const {
    createIssueModalIsOpen,
    updateIssueModalIsOpen,
    editIssueValues,
    issues,
    editBtnAction,
    deleteBtnAction,
    openCreateIssueModal,
    closeCreateIssueModal,
    closeUpdateIssueModal
  } = useIssueTools();

  return (
    <div>
      <div className={styles.title}>Issues:</div>
      <div className={`${styles.issuesList} ${columnMode && styles.column}`}>
        {Object.entries(issues).map(([id, { title, priority, current, link }]) => (
          <IssueCard
            key={`issue-${id}`}
            id={id}
            title={title}
            priority={priority}
            current={current}
            editMode={editMode}
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
  columnMode: false
};

export default IssueTools;
