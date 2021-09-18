import { Modal } from 'components/shared/Modal';
import { Select } from 'components/shared/Select';
import { TextInput } from 'components/shared/TextInput';
import React from 'react';
import { IssueModalProps } from 'src/types/issues';

export const IssueModal: React.FC<IssueModalProps> = ({
  handleChange,
  handleSelect,
  closeModal,
  addNewIssue,
  errors,
  valuesConfig,
  isLoading,
  isOpen,
  options,
  config,
}) => (
  <Modal
    isOpen={isOpen}
    modalTitle="Create Issue"
    yesBtnTitle="Yes"
    noBtnTitle="No"
    yesBtnOnClick={addNewIssue}
    noBtnOnClick={closeModal}
    loading={isLoading}
  >
    <form>
      {Object.entries(config).map(([inputName, {
        type, placeholder, label, errorText, 
      }]) => (type === 'text' ? (
        <TextInput
          key={inputName}
          name={inputName}
          value={valuesConfig[inputName].value}
          label={label}
          onChange={handleChange(valuesConfig[inputName].action)}
          placeholder={placeholder}
          errorMessage={errors[inputName] && errorText}
        />
      ) : (
        <Select
          key={inputName}
          value={valuesConfig[inputName].value}
          valuesConfig={options}
          name={inputName}
          handleChange={handleSelect}
        />
      )))}
    </form>
  </Modal>
);
