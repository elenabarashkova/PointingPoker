import React, { FunctionComponent, ReactElement } from 'react';
import { UserVote } from '../../../../types/voting';
import styles from './style.module.scss';
import coffee from '../../../voting/VotingCard/coffee-cup.svg';

interface MembersSectionProps {
  id: string;
  votes: UserVote[];
}

export const ScoresItem: FunctionComponent<MembersSectionProps> = (
  { votes, id },
): ReactElement => (
  <div className={styles.vote}>
    {votes.map(({ userId, vote }) => {
      if (userId === id) {
        return (
          <>
            {vote ? (
              vote === 'coffee' ? (<img key={id} src={coffee} alt="coffee" />) : (<span key={id}>{vote}</span>)
            ) : '-' }
          </>
        );
      }
      return null;
    })}
  </div>
);
