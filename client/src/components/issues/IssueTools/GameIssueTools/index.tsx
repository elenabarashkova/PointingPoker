import { useSortedIssues } from 'components/issues/hooks/useSortedIssues';
import { GameIssueCards } from 'components/issues/IssueCards/GameIssueCards';
import React from 'react';
import { IssueTools } from '..';
import styles from './style.module.scss';
import { useGameIssueTools } from './useGameIssueTools';

export const GameIssueTools: React.FC = () => {
  const {
    isLoading,
    voteMode,
    sendBtnAction,
    finalVoteInputAction,
    startRound,
    isCompleted,
    deleteBtnAction,
  } = useGameIssueTools();
  const { sortedIssues } = useSortedIssues();

  return (
    <IssueTools
      wrapperStyle={styles.column_wrapper}
      listStyle={styles.issues_list}
      titleStyle={styles.issues_title}
      createIssueStyle={styles.create_issue}
      cards={(
        <GameIssueCards
          issues={sortedIssues}
          deleteBtnAction={deleteBtnAction}
          sendBtnAction={sendBtnAction}
          finalVoteInputAction={finalVoteInputAction}
          voteMode={voteMode}
          isCompleted={isCompleted}
          isLoading={isLoading}
          startRound={startRound}
        />
      )}
    />
  );
};
