import React, { ReactElement } from 'react';
import styles from './style.module.scss';

const Header: React.FC = (): ReactElement => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <p>Planing</p>
      <span>Poker</span>
    </div>
  </header>
);

export default Header;
