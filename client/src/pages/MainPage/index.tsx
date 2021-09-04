import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const MainPage: React.FC = (): ReactElement => (

  <div className={styles.wrapper}>
    <Header />
    <Main />
    <Footer />
  </div>
);

export default MainPage;
