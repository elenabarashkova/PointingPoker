import {
  ChangeEvent, Dispatch, SetStateAction, useEffect, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIssueRequest } from 'src/redux/actions/issues';
import {
  FormConfig, FormValues, IssuePriority, UseIssueModal, 
} from 'src/types/issues';
import { RootStore } from 'src/types/store';
import { useValidation } from '../useValidation';

export const useCreateIssueModal = (config: FormConfig, noBtnAction: () => void): UseIssueModal => {
  const { issuesStore, game } = useSelector((store: RootStore) => store);
  const {
    issues, issuesCounter, isLoading, error, 
  } = issuesStore;

  const [issueTitle, setIssueTitle] = useState<string>(`Issue ${issuesCounter}`);
  const [issueLink, setIssueLink] = useState<string>('');
  const [issuePriority, setIssuePriority] = useState<keyof typeof IssuePriority>(IssuePriority.low);

  const {
    errors, validateField, formIsValid, resetErrors, 
  } = useValidation(config);
  const dispatch = useDispatch();

  const valuesConfig: FormValues = {
    issueTitle: {
      value: issueTitle,
      action: setIssueTitle,
    },
    issueLink: {
      value: issueLink,
      action: setIssueLink,
    },
    issuePriority: {
      value: issuePriority,
      action: setIssuePriority,
    },
  };

  const closeModal = () => {
    noBtnAction();
    setIssueTitle(`Issue ${issuesCounter}`);
    setIssueLink('');
    setIssuePriority(IssuePriority.low);
    resetErrors();
  };

  useEffect(() => {
    closeModal();
  }, [issues, error]);

  const handleChange = (setValue: Dispatch<SetStateAction<string>>) => (name: string, value: string) => {
    validateField(name, value);
    setValue(value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setIssuePriority(event.target.value as keyof typeof IssuePriority);
  };

  const addNewIssue = () => {
    if (formIsValid(valuesConfig)) {
      dispatch(
        addIssueRequest(game.roomId, {
          title: issueTitle,
          link: issueLink,
          priority: issuePriority,
        }),
      );
    }
  };

  return {
    handleChange,
    handleSelect,
    closeModal,
    addNewIssue,
    valuesConfig,
    errors,
    isLoading,
  };
};
