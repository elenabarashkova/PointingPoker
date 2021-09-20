import {
  ChangeEvent, MouseEvent, useEffect, useState, 
} from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { setFinalVoteRequest } from 'src/redux/actions/complexActions/setFinalVoteAction';
import { startRoundRequest } from 'src/redux/actions/complexActions/startRoundAction';
import { deleteIssueRequest } from 'src/redux/actions/issues';
import { EditIssueValues, IssuePriority, UseIssueTools } from 'src/types/issues';
import { GameStatus } from 'src/types/room';

export const useIssueTools = (): UseIssueTools => {
  const [createIssueModalIsOpen, setCreateIssueModalIsOpen] = useState<boolean>(false);
  const [updateIssueModalIsOpen, setUpdateIssueModalIsOpen] = useState<boolean>(false);
  const [finalVote, setFinalVote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editIssueValues, setEditIssueValues] = useState<EditIssueValues>({
    title: undefined,
    url: undefined,
    priority: undefined,
    id: undefined,
  });

  const { voting, game } = useTypedSelector((store) => store);
  const {
    roomId, gameStatus, roundIsActive, currentIssueId, 
  } = game;
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

  const sendBtnAction = (id: string) => (event: MouseEvent) => {
    event.stopPropagation();
    if (finalVote) {
      dispatch(setFinalVoteRequest(roomId, id, finalVote, setIsLoading));
    }
  };

  const finalVoteInputAction = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const { value } = event.target;
    setFinalVote(value);
  };

  const startRound = (id: string) => () => {
    if (gameStatus === GameStatus.active && !roundIsActive && id !== currentIssueId) {
      dispatch(startRoundRequest(roomId, id));
    }
  };

  const openCreateIssueModal = () => setCreateIssueModalIsOpen(true);
  const closeCreateIssueModal = () => setCreateIssueModalIsOpen(false);
  const closeUpdateIssueModal = () => setUpdateIssueModalIsOpen(false);
  const voteMode = (id: string): boolean => currentIssueId === id && !roundIsActive;
  const isCompleted = (id: string): boolean => !!voting[id]?.finalVote;

  return {
    createIssueModalIsOpen,
    updateIssueModalIsOpen,
    editIssueValues,
    isLoading,
    voteMode,
    editBtnAction,
    deleteBtnAction,
    sendBtnAction,
    openCreateIssueModal,
    closeCreateIssueModal,
    closeUpdateIssueModal,
    finalVoteInputAction,
    startRound,
    isCompleted,
  };
};
