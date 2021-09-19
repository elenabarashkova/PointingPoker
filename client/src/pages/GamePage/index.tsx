import { IssueList } from 'components/issues/IssueList';
import IssueTools from 'components/issues/IssueTools';
import GameTitle from 'components/shared/GameTitle';
import React, { ReactElement, useMemo } from 'react';
import { isMaster } from 'src/shared/isMaster';
import { Pages } from 'src/types/page';
import Footer from '../../components/page-parts/Footer';
import Header from '../../components/page-parts/Header';
import styles from './style.module.scss';

const GamePage: React.FC = (): ReactElement => {
  const isGameMaster = useMemo(() => isMaster(), []);
  
  return (
    <div className={styles.wrapper}>
      <Header page={Pages.game} />
      <main className={styles.main}>
        <GameTitle editable={false} />
        {isGameMaster ? <IssueTools editMode={false} columnMode /> : <IssueList />}
      </main>
      <Footer page={Pages.game} />
    </div>
  );
}; 

export default GamePage;
