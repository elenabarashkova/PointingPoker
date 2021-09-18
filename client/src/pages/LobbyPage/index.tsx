import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import MembersSection from 'components/MembersSection';
import GameTitle from 'components/shared/GameTitle';
import styles from './style.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LobbyPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.lobby} />
    <main className={styles.main}>
      <GameTitle editable={false} />
      <MembersSection />
    </main>
    <Footer page={Pages.lobby} />
  </div>
);

export default LobbyPage;
