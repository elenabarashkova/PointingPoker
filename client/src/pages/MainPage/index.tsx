import React, { ReactElement } from 'react';
import { Modal } from 'components/shared/Modal';
import styles from './style.module.scss';
import TestComponent from './testComponent';

const MainPage: React.FC = () : ReactElement => {
  const handleClickYesBtnMaster = () => {
    console.log('yes');
  };

  const handleClickNoBtnMaster = () => {
    console.log('no');
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <p>Planing</p>
          <span>Poker</span>
        </div>
      </header>
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
          <div className={styles.registrField}>
            <div className={styles.registrEl}>
              <span>Are you ready to be a scram master?</span>
              <Modal 
                openModalBtnTitle="start game"
                modalTitle="Connect to lobby"
                Component={<TestComponent />}
                yesBtnTitle="confirm"
                yesBtnOnClick={handleClickYesBtnMaster}
                noBtnNoTitle="cancel"
                noBtnNoOnClick={handleClickNoBtnMaster}
              />
            </div>
            
          </div>
          <div className={styles.palette}>
            <div className={styles.round}><span className={styles.feature}>plan</span></div>
            <div className={styles.round}><span className={styles.feature}>discuss</span></div>
            <div className={styles.round}><span className={styles.feature}>vote</span></div>
            <div className={styles.round}><span className={styles.feature}>chat</span></div>
            <div className={styles.round} />
            <a href="https://github.com/elenabarashkova" className={[styles.round, styles.small].join(' ')}> </a>
            <a href="https://github.com/StacieKot" className={[styles.round, styles.small].join(' ')}> </a>
            <a href="https://github.com/EkaterinaMosina" className={[styles.round, styles.small].join(' ')}> </a>
          </div>
        </div>
      </main> 
    </div>
  );
};

export default MainPage;
