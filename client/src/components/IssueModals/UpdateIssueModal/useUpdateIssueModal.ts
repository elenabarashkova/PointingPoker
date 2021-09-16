import {
  ChangeEvent, Dispatch, SetStateAction, useEffect, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateIssueRequest } from 'src/redux/actions/issues';
import {
  FormConfig, FormValues, IssuePriority, UseIssueModal, 
} from 'src/types/issues';
import { RootStore } from 'src/types/store';
import { useValidation } from '../useValidation';

export const useUpdateIssueModal = (
  config: FormConfig,
  noBtnAction: () => void,
  title: string,
  url: string,
  priority: keyof typeof IssuePriority,
  issueId: string,
): UseIssueModal => {
  const [issueTitle, setIssueTitle] = useState<string | null>(title);
  const [issueLink, setIssueLink] = useState<string | null>(url);
  const [issuePriority, setIssuePriority] = useState<keyof typeof IssuePriority | null>(priority);
  const [updated, setUpdated] = useState<boolean>(false);

  const { issuesStore, game } = useSelector((store: RootStore) => store);
  const { issues, isLoading, error } = issuesStore;
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
    setIssueTitle(undefined);
    setIssueLink(undefined);
    setIssuePriority(undefined);
    resetErrors();
  };

  useEffect(() => {
    if (updated) {
      closeModal();
    }
  }, [issues, error]);

  const handleChange = (setValue: Dispatch<SetStateAction<string>>) => (name: string, value: string) => {
    validateField(name, value);
    setValue(value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setIssuePriority(event.target.value as keyof typeof IssuePriority);
  };

  const updateIssue = () => {
    if (formIsValid(valuesConfig)) {
      dispatch(
        updateIssueRequest(game.roomId, issueId, {
          title: issueTitle,
          link: issueLink,
          priority: issuePriority,
        }),
      );
      setUpdated(true);
    }
  };

  return {
    handleChange,
    handleSelect,
    closeModal,
    updateIssue,
    valuesConfig,
    errors,
    isLoading,
  };
};
