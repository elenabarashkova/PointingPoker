import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';

interface FooterProps {
  page: keyof typeof Pages;
}

const Footer: React.FC<FooterProps> = ({ page }): ReactElement => {
  const teamMembers = ['elenabarashkova', 'StacieKot', 'EkaterinaMosina'];
  return (
    <footer className={`${styles.footer} ${styles[page]}`}>
      {teamMembers.map((el) => <a href={`https://github.com/${el}`} className={styles.githubIco} key={el}> </a>)}
    </footer>
  );
};

export default Footer;
