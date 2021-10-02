import { GameIssueCards } from 'components/issues/IssueCards/GameIssueCards';
import React from 'react';
import { IssueTools } from '..';
import styles from './style.module.scss';
import { useGameIssueTools } from './useGameIssueTools';

export const GameIssueTools: React.FC = () => {
  const {
    sortedIssues,
    finalVoteInputValue,
    deleteBtnIsDisabled,
    cardIsNotClickable,
    finalVoteIsLoading,
    voteMode,
    sendBtnAction,
    finalVoteInputAction,
    startRound,
    isCompleted,
    deleteBtnAction,
    getFinalVoteValue,
  } = useGameIssueTools();

  return (
    <IssueTools
      wrapperStyle={styles.column_wrapper}
      listStyle={styles.issues_list}
      titleStyle={styles.issues_title}
      createIssueStyle={styles.create_issue}
      cards={(
        <GameIssueCards
          issues={sortedIssues}
          finalVoteInputValue={finalVoteInputValue}
          finalVoteIsLoading={finalVoteIsLoading}
          cardIsNotClickable={cardIsNotClickable}
          deleteBtnIsDisabled={deleteBtnIsDisabled}
          deleteBtnAction={deleteBtnAction}
          sendBtnAction={sendBtnAction}
          getFinalVoteValue={getFinalVoteValue}
          finalVoteInputAction={finalVoteInputAction}
          voteMode={voteMode}
          isCompleted={isCompleted}
          startRound={startRound}
        />
      )}
    />
  );
};
