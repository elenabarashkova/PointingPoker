import React from 'react';
import { CreateIssueModalProps } from 'src/types/issues';
import { IssueModal } from '..';
import { useCreateIssueModal } from './useCreateIssueModal';

export const CreateIssueModal: React.FC<CreateIssueModalProps> = ({
  config,
  options,
  isOpen,
  noBtnAction,
}) => {
  const {
    handleChange, handleSelect, closeModal, addNewIssue, errors, valuesConfig, isLoading, 
  } = useCreateIssueModal(config, noBtnAction);
  return (
    <IssueModal
      handleChange={handleChange}
      handleSelect={handleSelect}
      closeModal={closeModal}
      addNewIssue={addNewIssue}
      errors={errors}
      valuesConfig={valuesConfig}
      isLoading={isLoading}
      isOpen={isOpen}
      options={options}
      config={config}
    />
  );
};
