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

const coffeeVote = <img src={coffee} alt="coffee" />;

export const ScoresItem: FunctionComponent<MembersSectionProps> = (
  {
    votes,
    id,
    isRoundActive,
    isMaster,
  },
): ReactElement => {
  const userVote = votes.find(({ userId }) => userId === id)?.vote;

  const actualVote = userVote === 'coffee' ? coffeeVote : (<span>{userVote}</span>);
  return (
    <div className={`${styles.vote} ${isMaster ? styles.master : ''}`}>
      {isRoundActive ? (
        <span key={id}>Pending</span>
      ) : (
        userVote ? actualVote : (<span>—</span>)
      )}
    </div>
  );
};
