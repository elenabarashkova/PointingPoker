import React, { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { stopRoundAction } from '../../../redux/actions/complexActions/stopRoundAction';
import { RootState } from '../../../redux/reducers';
import { isMaster } from '../../../shared/isMaster';
import { GameSettings } from '../../../types/room';
import {
  ActiveMembers, Members, UserRole, Users, UserStatus, 
} from '../../../types/user';
import { UserVote } from '../../../types/voting';
import MembersList from './MembersList';
import styles from './style.module.scss';

interface ScoresProps {
  users: Users;
  gameSettings: GameSettings;
  votes: UserVote[];
  roundIsActive: boolean;
  stopRound: CallableFunction;
  roomId: string;
}

const Scores: React.FC<ScoresProps> = ({
  users,
  gameSettings,
  votes,
  roundIsActive,
  stopRound,
  roomId,
}): ReactElement => {
  const isUserMaster = isMaster();

  const roomMembersData = Object.entries(users);
  const activeMembers: Members = roomMembersData.filter(
    ([, { status }]) => status === UserStatus.active || status === UserStatus.kicked,
  );

  const master: Members = activeMembers.filter(([, { role }]) => role === UserRole.master);
  const observers: Members = activeMembers.filter(([, { role }]) => role === UserRole.observer);
  const players: Members = activeMembers.filter(([, { role }]) => role === UserRole.player);
  const activePlayers: Members = activeMembers.filter(
    ([, { role, canParticipate }]) => role === UserRole.player && canParticipate,
  );

  const gameMembers: ActiveMembers = {
    master,
    observers,
    players,
  };

  useEffect(() => {
    const { timer, autoFlip, masterAsPlayer } = gameSettings;
    const playersQuantity = activePlayers.length + (masterAsPlayer ? 1 : 0);
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
    <>
      <div className={styles.scores}>
        <div className={styles.title}>Scores:</div>
        <MembersList
          isRoundActive={roundIsActive}
          gameMembers={gameMembers}
          hasActiveMembers={Boolean(activeMembers.length)}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({
  users, gameSettings, voting, game, 
}: RootState) => {
  const { currentIssueId, roundIsActive, roomId } = game;
  const result = {
    users,
    gameSettings,
    votes: [],
    roundIsActive,
    roomId,
  };
  if (voting[currentIssueId]) {
    result.votes = voting[currentIssueId].votes;
  }
  return result;
};

export default connect(mapStateToProps, { stopRound: stopRoundAction })(Scores);
