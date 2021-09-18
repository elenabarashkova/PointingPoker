import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import Footer from '../../components/page-parts/Footer';
import Header from '../../components/page-parts/Header';
import Main from '../../components/page-parts/Main(main-page)';
import styles from './style.module.scss';

const MainPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.main} />
    <Main />
    <Footer page={Pages.main} />
  </div>
);

export default MainPage;
