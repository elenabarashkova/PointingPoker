import React, { ReactElement } from 'react';
import styles from './style.module.scss';

const Footer: React.FC = (): ReactElement => (
  <footer className={styles.footer}>
    <a href="https://github.com/elenabarashkova" className={styles.githubIco}> </a>
    <a href="https://github.com/StacieKot" className={styles.githubIco}> </a>
    <a href="https://github.com/EkaterinaMosina" className={styles.githubIco}> </a>
  </footer>
);

export default Footer;
