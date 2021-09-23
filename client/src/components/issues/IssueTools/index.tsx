import React from 'react';
import { IssueToolsProps } from 'src/types/issues';
import { CreateIssue } from '../CreateIssue';
import { CREATE_ISSUE_FORM_CONFIG, ISSUE_PRIORITY_CONFIG } from '../IssueModals/config';
import { CreateIssueModal } from '../IssueModals/CreateIssueModal';
import { IssuesFromFile } from '../IssuesFromFile';
import styles from './style.module.scss';
import { useIssueTools } from './useIssueTools';

export const IssueTools: React.FC<IssueToolsProps> = ({
  wrapperStyle,
  listStyle,
  createIssueStyle,
  titleStyle,
  modalIsOpen,
  modal,
  cards,
}) => {
  const { createIssueModalIsOpen, openCreateIssueModal, closeCreateIssueModal } = useIssueTools();

  return (
    <div className={wrapperStyle}>
      <div className={`${styles.title} ${titleStyle}`}>Issues:</div>
      <div className={listStyle}>
        {cards}
        <CreateIssue addBtnAction={openCreateIssueModal} additionalStyle={createIssueStyle} />
        <IssuesFromFile additionalStyle={createIssueStyle} />
      </div>
      <CreateIssueModal
        isOpen={createIssueModalIsOpen}
        noBtnAction={closeCreateIssueModal}
        config={CREATE_ISSUE_FORM_CONFIG}
        options={ISSUE_PRIORITY_CONFIG}
      />
      {modalIsOpen && modal}
    </div>
  );
};
