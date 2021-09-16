import ChatField from 'components/ChatArea/ChatField';
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
    { page !== Pages.main && <ChatField /> }
  </header>
);

export default Header;
