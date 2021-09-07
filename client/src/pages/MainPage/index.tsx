import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';
import Header from '../../components/Header';
import Main from '../../components/Main(main-page)';
import Footer from '../../components/Footer';

const MainPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.main} />
    <Main />
    <Footer page={Pages.main} />
  </div>
);

export default MainPage;
