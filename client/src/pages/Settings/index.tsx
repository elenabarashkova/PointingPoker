import React, { ReactElement, useState } from 'react';
import { Pages } from 'src/types/page';
import MembersSection from 'components/MembersSection';
import GameSection from 'components/GameSection';
import styles from './style.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SettingsPage: React.FC = (): ReactElement => {
  const [areSettingsCustom, setCustomSettings] = useState(false);
  const [areIssuesCreated, setCreatedIssues] = useState(false);

  const addCustomSettings = () => {
    setCustomSettings(true);
  };

  return (
    <div className={styles.wrapper}>
      <Header page={Pages.settings} />
      <main className={styles.main}>
        <GameSection areIssuesCreated={areIssuesCreated} areSettingsCustom={areSettingsCustom} />
        <MembersSection />
      </main>
      <Footer page={Pages.settings} />
    </div>
  );
};

export default SettingsPage;
