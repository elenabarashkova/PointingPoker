import React, { ReactElement } from 'react';
import RegistrSection from 'components/RegistrSection';
import styles from './style.module.scss';

const Main: React.FC = (): ReactElement => (
  <main className={styles.container}>
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
    <div className={styles.containerMainField}>
      <RegistrSection />
      <div className={styles.palette}>
        <div className={styles.round}><span className={styles.feature}>plan</span></div>
        <div className={styles.round}><span className={styles.feature}>discuss</span></div>
        <div className={styles.round}><span className={styles.feature}>vote</span></div>
        <div className={styles.round}><span className={styles.feature}>chat</span></div>
        <div className={styles.round} />
      </div>
    </div>
  </main>
);

export default Main;
