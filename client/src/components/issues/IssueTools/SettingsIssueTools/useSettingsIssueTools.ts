import { useSortedIssues } from 'components/issues/hooks/useSortedIssues';
import { MouseEvent, useEffect, useState } from 'react';
import { EditIssueValues, IssuePriority, UseSettingsIssueTools } from 'src/types/issues';
import { useDeleteIssues } from '../useDeleteIssue';

export const useSettingsIssueTools = (): UseSettingsIssueTools => {
  const [updateIssueModalIsOpen, setUpdateIssueModalIsOpen] = useState<boolean>(false);
  const [editIssueValues, setEditIssueValues] = useState<EditIssueValues>({
    title: undefined,
    url: undefined,
    priority: undefined,
    id: undefined,
  });

  const { deleteBtnAction } = useDeleteIssues();
  const { sortedIssues } = useSortedIssues();

  useEffect(() => {
    if (editIssueValues.title) {
      setUpdateIssueModalIsOpen(true);
    }
  }, [editIssueValues]);

  const editBtnAction = (title: string, url: string, priority: keyof typeof IssuePriority, id: string) => (event: MouseEvent) => {
    event.stopPropagation();
    setEditIssueValues((prev) => ({
      ...prev,
      title,
      url,
      priority,
      id,
    }));
  };

  const closeUpdateIssueModal = () => setUpdateIssueModalIsOpen(false);

  return {
    updateIssueModalIsOpen,
    editIssueValues,
    sortedIssues,
    editBtnAction,
    deleteBtnAction,
    closeUpdateIssueModal,
  };
};
