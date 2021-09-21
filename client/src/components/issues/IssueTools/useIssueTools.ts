import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRoundRequest } from 'src/redux/actions/complexActions/startRoundAction';
import { deleteIssueRequest } from 'src/redux/actions/issues';
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

  const { roomId, gameStatus, roundIsActive } = useSelector((store: RootStore) => store.game);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editIssueValues.title) {
      setUpdateIssueModalIsOpen(true);
    }
  }, [editIssueValues]);

  const editBtnAction = (
    title: string,
    url: string,
    priority: keyof typeof IssuePriority,
    id: string,
  ) => (event: MouseEvent) => {
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

  const startRound = (id: string) => () => {
    if (gameStatus === GameStatus.active && !roundIsActive) {
      dispatch(startRoundRequest(roomId, id));
    }
  };

  const openCreateIssueModal = () => setCreateIssueModalIsOpen(true);
  const closeCreateIssueModal = () => setCreateIssueModalIsOpen(false);
  const closeUpdateIssueModal = () => setUpdateIssueModalIsOpen(false);

  return {
    createIssueModalIsOpen,
    updateIssueModalIsOpen,
    editIssueValues,
    editBtnAction,
    deleteBtnAction,
    openCreateIssueModal,
    closeCreateIssueModal,
    closeUpdateIssueModal,
    startRound,
  };
};
