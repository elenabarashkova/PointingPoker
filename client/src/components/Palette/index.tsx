import React, { ReactElement } from 'react';
import styles from './style.module.scss';

const Palette: React.FC = ():ReactElement => (
  <div className={styles.palette}>
    <div className={styles.round}><span className={styles.feature}>plan</span></div>
    <div className={styles.round}><span className={styles.feature}>discuss</span></div>
    <div className={styles.round}><span className={styles.feature}>vote</span></div>
    <div className={styles.round}><span className={styles.feature}>chat</span></div>
    <div className={styles.round} />
  </div>
);

export default Palette;
