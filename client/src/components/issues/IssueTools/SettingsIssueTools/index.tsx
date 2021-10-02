import { SettingsIssueCards } from 'components/issues/IssueCards/SettingsIssueCards';
import {
  CREATE_ISSUE_FORM_CONFIG,
  ISSUE_PRIORITY_CONFIG,
} from 'components/issues/IssueModals/config';
import { UpdateIssueModal } from 'components/issues/IssueModals/UpdateIssueModal';
import React from 'react';
import { IssueTools } from '..';
import styles from './style.module.scss';
import { useSettingsIssueTools } from './useSettingsIssueTools';

export const SettingsIssueTools: React.FC = () => {
  const {
    updateIssueModalIsOpen,
    editIssueValues,
    sortedIssues,
    deleteBtnIsDisabled,
    editBtnAction,
    deleteBtnAction,
    closeUpdateIssueModal,
  } = useSettingsIssueTools();

  const {
    title, url, priority, id, 
  } = editIssueValues;

  return (
    <IssueTools
      wrapperStyle={styles.row_wrapper}
      listStyle={styles.issues_list}
      modalIsOpen={updateIssueModalIsOpen}
      cards={(
        <SettingsIssueCards
          issues={sortedIssues}
          deleteBtnIsDisabled={deleteBtnIsDisabled}
          deleteBtnAction={deleteBtnAction}
          editBtnAction={editBtnAction}
        />
      )}
      modal={(
        <UpdateIssueModal
          isOpen={updateIssueModalIsOpen}
          noBtnAction={closeUpdateIssueModal}
          config={CREATE_ISSUE_FORM_CONFIG}
          options={ISSUE_PRIORITY_CONFIG}
          title={title}
          url={url}
          priority={priority}
          issueId={id}
        />
      )}
    />
  );
};
