import React, { ReactElement } from 'react';
import styles from './style.module.scss';

const Palette: React.FC = ():ReactElement => {
  const features = ['plan', 'discuss', 'vote', 'chat'];
  return (
    <div className={styles.palette}>
      {features.map((el) => <div className={styles.round} key={el}><span className={styles.feature}>{el}</span></div>)}
      <div className={styles.round} />
    </div>
  );
};

export default Palette;
