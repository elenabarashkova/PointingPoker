import React, { FunctionComponent, ReactElement } from 'react';
import { UserVote } from '../../../../../types/voting';
import styles from '../style.module.scss';
import coffee from '../../../../voting/VotingCard/coffee-cup.svg';

interface MembersSectionProps {
  id: string;
  votes: UserVote[];
  isRoundActive: boolean;
  isMaster: boolean;
}

export const ScoresItem: FunctionComponent<MembersSectionProps> = (
  {
    votes,
    id,
    isRoundActive,
    isMaster,
  },
): ReactElement => (
  <div className={`${styles.vote} ${isMaster ? styles.master : ''}`}>
    {votes.map(({ userId, vote }) => {
      if (userId === id) {
        return (
          <>
            {isRoundActive ? (
              <span key={userId}>Pending</span>
            ) : (vote ? (
              vote === 'coffee' ? (
                <img key={userId} src={coffee} alt="coffee" />
              ) : (
                <span key={userId}>{vote}</span>
              )) : (<span key={userId}>—</span>))}
          </>
        );
      }
      return null;
    })}
  </div>
);
