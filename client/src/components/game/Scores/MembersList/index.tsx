import UserCard from 'components/shared/UserCard';
import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import { ElementSize } from 'src/types/additional';
import { UserRole, Users, UserStatus } from 'src/types/user';
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
  const [master] = activeMembers.filter(([, { role }]) => role === UserRole.master);
  const [masterId, masterInfo] = master;
  const observers = activeMembers.filter(([, { role }]) => role === UserRole.observer);
  const players = activeMembers.filter(([, { role }]) => role === UserRole.player);

  return (
    <div className={styles.membersList}>
      {!activeMembers.length && <p>No members</p>}
      {gameSettings.masterAsPlayer ? (
        <div className={styles.item}>
          <div className="vote">
            {votes.map(({ userId, vote }) => {
              if (userId === masterId) {
                return (
                  <div key={masterId}>{vote}</div>
                );
              }
              return null;
            })}
          </div>
          <UserCard
            user={masterInfo}
            id={masterId}
            currentUserId={currectUserId}
            size={ElementSize.small}
            key={masterId}
          />
        </div>
      ) : null}
      {players.map(([id, userInfo]) => (
        <div key={id} className={styles.item}>
          <div className="vote">
            {votes.map(({ userId, vote }) => {
              if (userId === id) {
                return (
                  <div>{vote}</div>
                );
              }
              return null;
            })}
          </div>
          <UserCard
            user={userInfo}
            id={id}
            currentUserId={currectUserId}
            size={ElementSize.small}
          />
        </div>
      ))}
      {observers.map(([userId, userInfo]) => (
        <UserCard
          user={userInfo}
          id={userId}
          currentUserId={currectUserId}
          size={ElementSize.small}
          key={userId}
        />
      ))}
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
