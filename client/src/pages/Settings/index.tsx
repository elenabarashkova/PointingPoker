import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import MembersSection from 'components/MembersSection';
import { SettingsSection } from 'components/settings/SettingsSection';
import styles from './style.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SettingsPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.settings} />
    <main className={styles.main}>
      <MembersSection />
      <SettingsSection />
    </main>
    <Footer page={Pages.settings} />
  </div>
);

export default SettingsPage;
