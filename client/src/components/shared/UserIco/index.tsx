import React, { ReactElement } from 'react';
import styles from './style.module.scss';

interface UserIcoProps {
  firstName: string;
  lastName: string;
  imgSrc: string;
}

const UserIco: React.FC<UserIcoProps> = ({ firstName, lastName, imgSrc }): ReactElement => {
  const content = (!lastName) ? firstName[0] : firstName[0] + lastName[0];

  return (
    <div className={styles.userIco}>
      {imgSrc ? <img src={imgSrc} alt="" className={styles.userImg} /> : <p>{content}</p>}
    </div>
  );
};

export default UserIco;
