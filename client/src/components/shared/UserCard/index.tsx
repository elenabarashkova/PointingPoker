import React, { ReactElement } from 'react';
import { User, UserRole } from 'src/types/user';
import { ElementSize } from 'src/types/additional';
import KickButton from '../buttons/KickButton';
import UserIco from '../UserIco';
import styles from './style.module.scss';
import crown from './crown.svg';

interface UserCardProps {
  user: User;
  id: string;
  currentUserId: string;
  size: keyof typeof ElementSize;
}

const UserCard: React.FC<UserCardProps> = ({
  user, id, currentUserId, size, 
}): ReactElement => {
  // если статус не UserStatus.active, перекрасить в серый цвет

  const { 
    name, role, jobPosition, image, 
  } = user;
  const [firstName, lastName] = name.split(' ');

  const isUserCurrentUser = (id === currentUserId);

  const handleClick = () => {
    console.log('id', id);
    // todo: отправить запрос на сервер с currentUserId и id для удаления игрока
  };

  return (
    <div className={`${styles.userCard} ${styles[size]} ${role === UserRole.master && styles.master}`}>
      {(role === UserRole.master && size === ElementSize.big) 
      && <img src={crown} alt="crown" className={styles.crown} />}
      <div className={styles.wrapper}>
        <UserIco firstName={firstName} lastName={lastName} imgSrc={image} size={size} />
        <div className={styles.userInfo}>
          {isUserCurrentUser && <span className={styles.currentUserInfo}>It is you</span>}
          <p className={styles.userName}>{name}</p>
          <p className={styles.jobPosition}>{jobPosition}</p>
        </div>
        {(!isUserCurrentUser && role !== UserRole.master) && <KickButton onClick={handleClick} />}
      </div>
    </div>
  );
};

export default UserCard;
