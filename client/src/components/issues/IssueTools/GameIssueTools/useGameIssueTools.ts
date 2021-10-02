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
  const [finalVoteIsLoading, setFinalVoteIsLoading] = useState<boolean>(false);

  const { voting, game } = useTypedSelector((store) => store);
  const {
    roomId, gameStatus, roundIsActive, currentIssueId, isLoading, 
  } = game;

  const dispatch = useDispatch();

  const { deleteBtnIsDisabled, deleteBtnAction } = useDeleteIssues();
  const { sortedIssues } = useSortedIssues();

  const sendBtnAction = (id: string) => (event: MouseEvent) => {
    event.stopPropagation();
    if (finalVote) {
      dispatch(setFinalVoteRequest(roomId, id, finalVote, setFinalVoteIsLoading));
      setFinalVote('');
    }
  };

  const finalVoteInputAction = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const { value } = event.target;
    setFinalVote(value);
  };

  const voteMode = (id: string): boolean => currentIssueId === id && !roundIsActive;

  const isCompleted = (id: string): boolean => !!voting[id]?.finalVote;

  const getFinalVoteValue = (id: string) => voting[id]?.finalVote || undefined;

  const newRoundCanBeStarted = (id: string) => (currentIssueId
    ? gameStatus === GameStatus.active
        && id !== currentIssueId
        && !roundIsActive
        && isCompleted(currentIssueId)
    : true);

  const startRound = (id: string) => () => {
    if (newRoundCanBeStarted(id)) {
      dispatch(startRoundRequest(roomId, id));
    }
  };

  const cardIsNotClickable = isLoading
    || roundIsActive
    || (gameStatus === GameStatus.active && currentIssueId && !voting[currentIssueId]?.finalVote);

  return {
    sortedIssues,
    finalVoteInputValue: finalVote,
    deleteBtnIsDisabled,
    finalVoteIsLoading,
    cardIsNotClickable,
    getFinalVoteValue,
    voteMode,
    sendBtnAction,
    finalVoteInputAction,
    startRound,
    isCompleted,
    deleteBtnAction,
  };
};
