import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import Header from '../../components/page-components/Header';
import Footer from '../../components/page-components/Footer';
import styles from './style.module.scss';

const GamePage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.game} />
    <h2>GamePage</h2>      
    <Footer page={Pages.game} />
  </div>
);

export default GamePage;
