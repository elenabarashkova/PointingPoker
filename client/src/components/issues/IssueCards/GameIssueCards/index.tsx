import FinalVoteInput from 'components/issues/FinalVoteInput';
import { IssueCard } from 'components/issues/IssueCards/IssueCard';
import React from 'react';
import { GameIssueCardsProps, IssueStatus } from 'src/types/issues';

export const GameIssueCards: React.FC<GameIssueCardsProps> = ({
  issues,
  finalVoteInputValue,
  isLoading,
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
      id, title, priority, status, 
    }) => (
      <IssueCard
        key={id}
        id={id}
        columnMode
        title={title}
        priority={priority}
        current={status === IssueStatus.active}
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
            disabled={isLoading}
            completed={isCompleted(id)}
          />
        )}
      />
    ))}
  </>
);
