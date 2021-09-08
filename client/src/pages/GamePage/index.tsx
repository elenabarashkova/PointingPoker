import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const GamePage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.game} />
    <h2>GamePage</h2>
    <Footer page={Pages.game} />
  </div>
);

export default GamePage;
