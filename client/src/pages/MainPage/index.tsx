import React, { ReactElement } from 'react';
import { useParams } from 'react-router';
import { Pages } from 'src/types/page';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Main from '../../components/Main(main-page)';
import styles from './style.module.scss';

const MainPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.main} />
    <Main />
    <Footer page={Pages.main} />
  </div>
);

export default MainPage;
