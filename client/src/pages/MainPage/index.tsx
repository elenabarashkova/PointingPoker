import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';
import Header from '../../components/Header';
import Main from './Main';
import Footer from '../../components/Footer';

const MainPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.main} />
    <Main />
    <Footer page={Pages.main} />
  </div>
);

export default MainPage;
