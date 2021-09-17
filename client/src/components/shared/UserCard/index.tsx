import React, { ReactElement } from 'react';
import { User, UserRole, UserStatus } from 'src/types/user';
import { ElementSize } from 'src/types/additional';
import KickButton from '../buttons/KickButton';
import UserIco from '../UserIco';
import styles from './style.module.scss';
import crown from './crown.svg';
import observer from './observer.svg';
import player from './player.svg';

interface UserCardProps {
  user: User;
  id: string;
  currentUserId: string;
  size: keyof typeof ElementSize;
}

const UserCard: React.FC<UserCardProps> = ({
  user, id, currentUserId, size, 
}): ReactElement => {
  const { 
    name, role, jobPosition, image, status,
  } = user;
  const [firstName, lastName] = name.split(' ');

  const notCurrentUser = !(id === currentUserId);
  const isMaster = role === UserRole.master;
  const isPlayer = role === UserRole.player;
  const userIsActive = status === UserStatus.active;
  const isCardBig = size === ElementSize.big;

  const canUserBeKicked = notCurrentUser && !isMaster && userIsActive;

  const userRoleInfo: ReactElement = (isMaster) 
    ? (
      <div className={styles.roleInfo}>
        <img src={crown} alt="crown" className={styles.roleIco} /> 
        <span>Scram master</span>
      </div>
    )
    : (isPlayer)
      ? (
        <div className={styles.roleInfo}>
          <img src={player} alt="game controller" className={styles.roleIco} /> 
          <span>Player</span>
        </div>
      )
      : (
        <div className={styles.roleInfo}>
          <img src={observer} alt="eyes" className={styles.roleIco} /> 
          <span>Observer</span>
        </div>
      );

  return (
    <div className={`${styles.userCard} ${styles[size]} 
      ${isMaster && styles.master} 
      ${!userIsActive && styles.nonActiveUser}`}
    >
      {isCardBig && userRoleInfo}
      <div className={styles.wrapper}>
        <UserIco firstName={firstName} lastName={lastName} imgSrc={image} size={size} userStatus={status} />
        <div className={styles.userInfo}>
          {!notCurrentUser && <span className={styles.currentUserInfo}>It is you</span>}
          {/* {status !== UserStatus.active && <span className={styles.noActiveStatus}>User is not active</span>} */}
          <p className={styles.userName}>{name}</p>
          <p className={styles.jobPosition}>{jobPosition}</p>
        </div>
        {canUserBeKicked && <KickButton userId={id} />}
      </div>
    </div>
  );
};

export default UserCard;
