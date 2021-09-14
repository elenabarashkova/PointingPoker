import { Modal } from 'components/shared/Modal';
import { TextInput } from 'components/shared/TextInput';
import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { CreateIssueModalProps } from 'src/types/issues';
import { RootStore } from 'src/types/store';
import { getNextIssueNumber } from './helpers';

export const CreateIssueModal: React.FC<CreateIssueModalProps> = ({ isOpen }) => {
  const { issues, game } = useSelector((store: RootStore) => store);

  const [issueTitle, setIssueTitle] = useState<string>(
    `Issue ${getNextIssueNumber(issues.issues)}`,
  );
  const [issueTheme, setIssueTheme] = useState<string>('');
  const [issueLink, setIssueLink] = useState<string>('');
  // const [issuePriority, setIssuePriority] = useState<keyof typeof IssuePriority>(IssuePriority.low);

  const handleIssueTitleChanging = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIssueTitle(target.value);
  };

  const handleIssueThemeChanging = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIssueTitle(target.value);
  };

  const handleIssueLinkChanging = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIssueTitle(target.value);
  };

  // const handleIssuePriorityChanging = ({ target }: ChangeEvent<HTMLInputElement>) => {
  //   setIssueTitle(target.value);
  // };

  return (
    <Modal
      isOpen
      modalTitle="Create Issue"
      yesBtnTitle="Yes"
      noBtnNoTitle="No"
      yesBtnOnClick={() => console.log('close')}
      noBtnNoOnClick={() => console.log('close')}
    >
      <form>
        <TextInput
          name="issue-title"
          value={issueTitle}
          label="Title:"
          onChange={handleIssueTitleChanging}
          placeholder=""
          errorMessage="This field must not be empty"
        />
        <TextInput
          name="issue-theme"
          value={issueTheme}
          label="Theme:"
          onChange={handleIssueThemeChanging}
          placeholder="add few words about issue"
          errorMessage="This field must not be empty"
        />
        <TextInput
          name="issue-link"
          value={issueLink}
          label="Link:"
          onChange={handleIssueLinkChanging}
          placeholder=""
          errorMessage="This field must not be empty"
        />
      </form>
    </Modal>
  );
};
