import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import { UserRole, Users, UserStatus } from 'src/types/user';
import { UsersItem } from 'components/game/Scores/MembersList/UsersItem';
import styles from './style.module.scss';
import { GameSettings } from '../../../../types/room';
import { UserVote } from '../../../../types/voting';

interface MembersSectionProps {
  users: Users;
  gameSettings: GameSettings;
  votes: UserVote[];
}

const MembersList: FunctionComponent<MembersSectionProps> = (
  { users, gameSettings, votes },
): ReactElement => {
  const currectUserId = useTypedSelector((state) => state.currentUserId);
  const roomMembersData = Object.entries(users);
  const activeMembers = roomMembersData.filter(([, { status }]) => (
    (status === UserStatus.active || status === UserStatus.kicked)
  ));
  const master = activeMembers.filter(([, { role }]) => role === UserRole.master);
  const observers = activeMembers.filter(([, { role }]) => role === UserRole.observer);
  const players = activeMembers.filter(([, { role }]) => role === UserRole.player);

  return (
    <div className={styles.membersList}>
      {!activeMembers.length && <p>No members</p>}
      {gameSettings.masterAsPlayer ? (
        <UsersItem users={master} votes={votes} currectUserId={currectUserId} />
      ) : null}
      <UsersItem users={players} votes={votes} currectUserId={currectUserId} />
      <UsersItem users={observers} votes={votes} currectUserId={currectUserId} />
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
  const { currentIssueId } = game;
  return ({
    users,
    gameSettings,
    votes: voting[currentIssueId].votes,
  });
};

export default connect(mapStateToProps)(MembersList);
