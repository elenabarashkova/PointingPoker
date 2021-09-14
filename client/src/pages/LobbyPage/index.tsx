import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';
import Header from '../../components/page-components/Header';
import Footer from '../../components/page-components/Footer';

const LobbyPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.lobby} />
    <h2>LobbyPage</h2>
    <Footer page={Pages.lobby} />
  </div>
);

export default LobbyPage;
