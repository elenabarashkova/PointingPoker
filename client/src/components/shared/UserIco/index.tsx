import React, { ReactElement } from 'react';
import { ElementSize } from 'src/types/additional';
import { UserStatus } from 'src/types/user';
import styles from './style.module.scss';

interface UserIcoProps {
  firstName: string;
  lastName: string;
  imgSrc: string;
  size: keyof typeof ElementSize;
  userStatus?: keyof typeof UserStatus;
}

const UserIco: React.FC<UserIcoProps> = ({
  firstName, lastName, imgSrc, size, userStatus,
}): ReactElement => {
  const content = (!firstName && !lastName) 
    ? ''
    : (firstName && !lastName) 
    ? firstName[0]
    : (!firstName && lastName) 
    ? lastName[0]
    : firstName[0] + lastName[0];

  return (
    <div className={`${styles.userIco} ${styles[size]} ${userStatus !== UserStatus.active && styles.nonActiveUser}`}>
      {imgSrc ? <img src={imgSrc} alt="" className={styles.userImg} /> : <p>{content}</p>}
    </div>
  );
};

UserIco.defaultProps = {
  userStatus: UserStatus.active,
};
export default UserIco;
