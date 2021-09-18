import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import GameTitle from 'components/shared/GameTitle';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './style.module.scss';

const GamePage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.game} />
    <main className={styles.main}>
      <GameTitle editable={false} />
    </main>
    <Footer page={Pages.game} />
  </div>
);

export default GamePage;
