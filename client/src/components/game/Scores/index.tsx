import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import MembersList from './MembersList';
import styles from './style.module.scss';
import { RootState } from '../../../redux/reducers';
import { Users } from '../../../types/user';
import { GameSettings } from '../../../types/room';
import { UserVote } from '../../../types/voting';

interface ScoresProps {
  users: Users;
  gameSettings:GameSettings;
  votes: UserVote[];
  roundIsActive: boolean;
}

const Scores: React.FC<ScoresProps> = (
  {
    users,
    gameSettings,
    votes,
    roundIsActive,
  },
): ReactElement => {
  const [isRoundStopped, sitRoundStoped] = useState(false);

  return (
    <div className={styles.scores}>
      <MembersList />
    </div>
  );
};

const mapStateToProps = (
  {
    users,
    gameSettings,
    voting,
    game,
  }: RootState,
) => {
  const { currentIssueId, roundIsActive } = game;
  return ({
    users,
    gameSettings,
    votes: voting[currentIssueId].votes,
    roundIsActive,
  });
};

export default connect(mapStateToProps)(Scores);
