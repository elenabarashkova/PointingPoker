import { IssueCard } from 'components/issues/IssueCards/IssueCard';
import React from 'react';
import { GameIssueCardsProps, IssueStatus } from 'src/types/issues';

export const GameIssueCards: React.FC<GameIssueCardsProps> = ({
  issues,
  deleteBtnAction,
  sendBtnAction,
  finalVoteInputAction,
  voteMode,
  isCompleted,
  isLoading,
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
        isCompleted={isCompleted(id)}
        isSending={isLoading}
        onClick={startRound(id)}
        inputAction={finalVoteInputAction}
        deleteBtnAction={deleteBtnAction(id)}
        sendBtnAction={sendBtnAction(id)}
      />
    ))}
  </>
);
