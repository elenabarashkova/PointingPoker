import IssueTools from 'components/issues/IssueTools';
import GameTitle from 'components/shared/GameTitle';
import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import Footer from '../../components/page-parts/Footer';
import Header from '../../components/page-parts/Header';
import styles from './style.module.scss';

const GamePage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.game} />
    <main className={styles.main}>
      <GameTitle editable={false} />

      <IssueTools editMode={false} columnMode />
    </main>
    <Footer page={Pages.game} />
  </div>
);

export default GamePage;
