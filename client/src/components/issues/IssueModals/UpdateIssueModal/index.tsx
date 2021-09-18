import React from 'react';
import { UpdateIssueModalProps } from 'src/types/issues';
import { IssueModal } from '../index';
import { useUpdateIssueModal } from './useUpdateIssueModal';

export const UpdateIssueModal: React.FC<UpdateIssueModalProps> = ({
  config,
  options,
  isOpen,
  title,
  url,
  priority,
  issueId,
  noBtnAction,
}) => {
  const {
    handleChange, handleSelect, closeModal, updateIssue, errors, valuesConfig, isLoading, 
  } = useUpdateIssueModal(config, noBtnAction, title, url, priority, issueId);
  return (
    <IssueModal
      handleChange={handleChange}
      handleSelect={handleSelect}
      closeModal={closeModal}
      addNewIssue={updateIssue}
      errors={errors}
      valuesConfig={valuesConfig}
      isLoading={isLoading}
      isOpen={isOpen}
      options={options}
      config={config}
    />
  );
};
