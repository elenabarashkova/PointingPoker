import React, { ReactElement } from 'react';
import RegisterSection from 'components/RegisterSection';
import SloganField from 'components/SloganField';
import Palette from 'components/Palette';
import styles from './style.module.scss';

const Main: React.FC = (): ReactElement => (
  <main className={styles.container}>
    <SloganField />
    <div className={styles.containerMainField}>
      <RegisterSection />
      <Palette />
    </div>
  </main>
);

export default Main;
