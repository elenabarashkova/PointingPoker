import React, { ReactElement } from 'react';
import styles from './style.module.scss';

const SloganField: React.FC = ():ReactElement => (
  <div className={styles.containerSloganField}>
    <p className={styles.slogan}>
      We practice 
      <span className={styles.markBold}> improvement </span> 
      through 
      <span className={styles.markItal}> work</span>
      , 
      <span className={styles.markBold}> work </span> 
      through 
      <span className={styles.markItal}> improvement</span>
      , one 
      <span className={styles.markBold}> sprint </span>
      at a time
    </p>
  </div>
);

export default SloganField;
