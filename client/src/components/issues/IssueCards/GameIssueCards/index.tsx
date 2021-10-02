import FinalVoteInput from 'components/issues/FinalVoteInput';
import { IssueCard } from 'components/issues/IssueCards/IssueCard';
import React from 'react';
import { GameIssueCardsProps, IssueStatus } from 'src/types/issues';

export const GameIssueCards: React.FC<GameIssueCardsProps> = ({
  issues,
  finalVoteInputValue,
  cardIsNotClickable,
  finalVoteIsLoading,
  deleteBtnIsDisabled,
  getFinalVoteValue,
  deleteBtnAction,
  sendBtnAction,
  finalVoteInputAction,
  voteMode,
  isCompleted,
  startRound,
}) => (
  <>
    {issues.map(({
      id, title, priority, status, link, 
    }) => (
      <IssueCard
        key={id}
        id={id}
        columnMode
        gameMode
        title={title}
        link={link}
        priority={priority}
        current={status === IssueStatus.active}
        deleteBtnIsDisabled={deleteBtnIsDisabled}
        cardIsNotClickable={cardIsNotClickable}
        voteMode={voteMode(id)}
        onClick={startRound(id)}
        deleteBtnAction={deleteBtnAction(id)}
        isCompleted={isCompleted(id)}
        finalVote={getFinalVoteValue(id)}
        input={(
          <FinalVoteInput
            onChange={finalVoteInputAction}
            value={finalVoteInputValue}
            onClick={sendBtnAction(id)}
            disabled={finalVoteIsLoading}
            completed={isCompleted(id)}
          />
        )}
      />
    ))}
  </>
);
