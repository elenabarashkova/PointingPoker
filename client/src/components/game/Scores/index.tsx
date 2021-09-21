import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MembersList from './MembersList';
import styles from './style.module.scss';
import { RootState } from '../../../redux/reducers';
import { UserRole, Users, UserStatus } from '../../../types/user';
import { GameSettings } from '../../../types/room';
import { UserVote } from '../../../types/voting';
import { isMaster } from '../../../shared/isMaster';
import { startRoundRequest } from '../../../redux/actions/complexActions/startRoundAction';
import { stopRoundAction } from '../../../redux/actions/complexActions/stopRoundAction';

interface ScoresProps {
  users: Users;
  gameSettings:GameSettings;
  votes: UserVote[];
  roundIsActive: boolean;
  stopRound: CallableFunction;
  roomId: string;
}

const Scores: React.FC<ScoresProps> = (
  {
    users,
    gameSettings,
    votes,
    roundIsActive,
    stopRound,
    roomId,
  },
): ReactElement => {
  const isUserMaster = isMaster();

  const roomMembersData = Object.entries(users);
  const activeMembers = roomMembersData.filter(([, { status }]) => (
    (status === UserStatus.active || status === UserStatus.kicked)
  ));
  const master = activeMembers.filter(([, { role }]) => role === UserRole.master);
  const observers = activeMembers.filter(([, { role }]) => role === UserRole.observer);
  const players = activeMembers.filter(([, { role }]) => role === UserRole.player);

  const gameMembers = {
    master,
    observers,
    players,
  };

  useEffect(() => {
    const { timer, autoFlip, masterAsPlayer } = gameSettings;
    const playersQuantity = players.length + (masterAsPlayer ? 1 : 0);
    const everyoneVoted = votes.length === playersQuantity;
    // todo: make extra check for empty votes

    const caseOne = roundIsActive && !timer && everyoneVoted;
    const caseTwo = everyoneVoted && autoFlip;

    if (caseOne || caseTwo) {
      if (isUserMaster) {
        stopRound(roomId);
      }
    }
  });

  return (
    <div className={styles.scores}>
      <MembersList
        isRoundActive={roundIsActive}
        gameMembers={gameMembers}
        hasActiveMembers={Boolean(activeMembers.length)}
      />
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
  const { currentIssueId, roundIsActive, roomId } = game;
  return ({
    users,
    gameSettings,
    votes: voting[currentIssueId].votes,
    roundIsActive,
    roomId,
  });
};

export default connect(mapStateToProps, { stopRound: stopRoundAction })(Scores);
