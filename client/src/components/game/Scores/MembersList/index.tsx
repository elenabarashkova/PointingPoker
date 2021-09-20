import UserCard from 'components/shared/UserCard';
import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import { ElementSize } from 'src/types/additional';
import { UserRole, Users, UserStatus } from 'src/types/user';
import styles from './style.module.scss';
import { GameSettings } from '../../../../types/room';

interface MembersSectionProps {
  users: Users;
  gameSettings: GameSettings;
}

const MembersList: FunctionComponent<MembersSectionProps> = ({ users, gameSettings }): ReactElement => {
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
        <UserCard
          user={masterInfo}
          id={masterId}
          currentUserId={currectUserId}
          size={ElementSize.small}
          key={masterId}
        />
      ) : null}
      {players.map(([userId, userInfo]) => (
        <UserCard
          user={userInfo}
          id={userId}
          currentUserId={currectUserId}
          size={ElementSize.small}
          key={userId}
        />
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

const mapStateToProps = ({ users, gameSettings }: RootState) => ({
  users,
  gameSettings,
});

export default connect(mapStateToProps)(MembersList);
