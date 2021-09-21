import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { deleteIssueRequest } from 'src/redux/actions/issues';
import { EditIssueValues, IssuePriority, UseSettingsIssueTools } from 'src/types/issues';

export const useSettingsIssueTools = (): UseSettingsIssueTools => {
  const [updateIssueModalIsOpen, setUpdateIssueModalIsOpen] = useState<boolean>(false);
  const [editIssueValues, setEditIssueValues] = useState<EditIssueValues>({
    title: undefined,
    url: undefined,
    priority: undefined,
    id: undefined,
  });

  const { roomId } = useTypedSelector((store) => store.game);
  const dispatch = useDispatch();

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

  const deleteBtnAction = (id: string) => (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteIssueRequest(roomId, id));
  };

  const closeUpdateIssueModal = () => setUpdateIssueModalIsOpen(false);

  return {
    updateIssueModalIsOpen,
    editIssueValues,
    editBtnAction,
    deleteBtnAction,
    closeUpdateIssueModal,
  };
};
