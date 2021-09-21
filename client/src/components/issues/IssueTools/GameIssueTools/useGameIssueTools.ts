import { ChangeEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { setFinalVoteRequest } from 'src/redux/actions/complexActions/setFinalVoteAction';
import { startRoundRequest } from 'src/redux/actions/complexActions/startRoundAction';
import { deleteIssueRequest } from 'src/redux/actions/issues';
import { UseGameIssueTools } from 'src/types/issues';
import { GameStatus } from 'src/types/room';

export const useGameIssueTools = (): UseGameIssueTools => {
  const [finalVote, setFinalVote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { voting, game } = useTypedSelector((store) => store);
  const {
    roomId, gameStatus, roundIsActive, currentIssueId, 
  } = game;
  const dispatch = useDispatch();

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

  const voteMode = (id: string): boolean => currentIssueId === id && !roundIsActive;
  const isCompleted = (id: string): boolean => !!voting[id]?.finalVote;

  return {
    isLoading,
    voteMode,
    sendBtnAction,
    finalVoteInputAction,
    startRound,
    isCompleted,
    deleteBtnAction,
  };
};
