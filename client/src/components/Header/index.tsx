import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';

interface HeaderProps {
  page: keyof typeof Pages;
}

const Header: React.FC<HeaderProps> = ({ page }): ReactElement => (
  <header className={`${styles.header} ${styles[page]}`}>
    <div className={styles.logo}>
      <p>Planing</p>
      <span>Poker</span>
    </div>
    { page !== Pages.main && <div className={styles.chat} /> }
  </header>
);

export default Header;
