import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortByDate } from 'src/helpers/sortByDate';
import { activateIssueRequest, deleteIssueRequest } from 'src/redux/actions/issues';
import { EditIssueValues, IssuePriority, UseIssueTools } from 'src/types/issues';
import { GameStatus } from 'src/types/room';
import { RootStore } from 'src/types/store';

export const useIssueTools = (): UseIssueTools => {
  const [createIssueModalIsOpen, setCreateIssueModalIsOpen] = useState<boolean>(false);
  const [updateIssueModalIsOpen, setUpdateIssueModalIsOpen] = useState<boolean>(false);
  const [editIssueValues, setEditIssueValues] = useState<EditIssueValues>({
    title: undefined,
    url: undefined,
    priority: undefined,
    id: undefined,
  });

  const { issuesStore, game } = useSelector((store: RootStore) => store);
  const { issues } = issuesStore;
  const { roomId, gameStatus } = game;
  const dispatch = useDispatch();

  useEffect(() => {
    if (editIssueValues.title) {
      setUpdateIssueModalIsOpen(true);
    }
  }, [editIssueValues]);

  const editBtnAction = (title: string, url: string, priority: keyof typeof IssuePriority, id: string) => () => {
    setEditIssueValues((prev) => ({
      ...prev,
      title,
      url,
      priority,
      id,
    }));
  };

  const deleteBtnAction = (id: string) => () => {
    if (gameStatus === GameStatus.active) {
      dispatch(deleteIssueRequest(roomId, id));
    }
  };

  const activateIssue = (id: string) => () => {
    dispatch(activateIssueRequest(roomId, id));
  };

  const openCreateIssueModal = () => setCreateIssueModalIsOpen(true);
  const closeCreateIssueModal = () => setCreateIssueModalIsOpen(false);
  const closeUpdateIssueModal = () => setUpdateIssueModalIsOpen(false);

  const sortedIssues = sortByDate(issues);

  return {
    createIssueModalIsOpen,
    updateIssueModalIsOpen,
    editIssueValues,
    sortedIssues,
    editBtnAction,
    deleteBtnAction,
    openCreateIssueModal,
    closeCreateIssueModal,
    closeUpdateIssueModal,
    activateIssue,
  };
};
