import { useSortedIssues } from 'components/issues/hooks/useSortedIssues';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { setFinalVoteRequest } from 'src/redux/actions/complexActions/setFinalVoteAction';
import { startRoundRequest } from 'src/redux/actions/complexActions/startRoundAction';
import { UseGameIssueTools } from 'src/types/issues';
import { GameStatus } from 'src/types/room';
import { useDeleteIssues } from '../useDeleteIssue';

export const useGameIssueTools = (): UseGameIssueTools => {
  const [finalVote, setFinalVote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { voting, game } = useTypedSelector((store) => store);
  const {
    roomId, gameStatus, roundIsActive, currentIssueId, 
  } = game;

  const dispatch = useDispatch();

  const { deleteBtnAction } = useDeleteIssues();
  const { sortedIssues } = useSortedIssues();

  const sendBtnAction = (id: string) => (event: MouseEvent) => {
    event.stopPropagation();
    if (finalVote) {
      dispatch(setFinalVoteRequest(roomId, id, finalVote, setIsLoading));
      setFinalVote('');
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

  const getFinalVoteValue = (id: string) => voting[id]?.finalVote || undefined;

  const voteMode = (id: string): boolean => currentIssueId === id && !roundIsActive;
  const isCompleted = (id: string): boolean => !!voting[id]?.finalVote;

  return {
    isLoading,
    sortedIssues,
    finalVoteInputValue: finalVote,
    getFinalVoteValue,
    voteMode,
    sendBtnAction,
    finalVoteInputAction,
    startRound,
    isCompleted,
    deleteBtnAction,
  };
};
