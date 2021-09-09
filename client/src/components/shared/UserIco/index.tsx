import React, { ReactElement } from 'react';
import { ElementSize } from 'src/types/additional';
import styles from './style.module.scss';

interface UserIcoProps {
  firstName: string;
  lastName: string;
  imgSrc: string;
  size: keyof typeof ElementSize;
}

const UserIco: React.FC<UserIcoProps> = ({
  firstName, lastName, imgSrc, size, 
}): ReactElement => {
  const content = (!lastName) ? firstName[0] : firstName[0] + lastName[0];

  return (
    <div className={`${styles.userIco} ${styles[size]}`}>
      {imgSrc ? <img src={imgSrc} alt="" className={styles.userImg} /> : <p>{content}</p>}
    </div>
  );
};

export default UserIco;
