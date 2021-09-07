import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';

interface FooterProps {
  page: keyof typeof Pages;
}

const Footer: React.FC<FooterProps> = ({ page }): ReactElement => (
  <footer className={`${styles.footer} ${styles[page]}`}>
    <a href="https://github.com/elenabarashkova" className={styles.githubIco}> </a>
    <a href="https://github.com/StacieKot" className={styles.githubIco}> </a>
    <a href="https://github.com/EkaterinaMosina" className={styles.githubIco}> </a>
  </footer>
);

export default Footer;
