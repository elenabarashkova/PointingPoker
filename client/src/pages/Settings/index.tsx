import React, { ReactElement, useEffect, useState } from 'react';
import { Pages } from 'src/types/page';
import MembersSection from 'components/MembersSection';
import GameSection from 'components/GameSection';
import { RootState } from 'src/redux/reducers';
import SettingsSection from 'components/settings/SettingsSection';
import GameTitle from 'components/shared/GameTitle';
import { Issues } from 'src/types/issues';
import { connect } from 'react-redux';
import styles from './style.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export interface SettingsPageProps {
  issues: Issues;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ issues }): ReactElement => {
  const [areSettingsCustom, setCustomSettings] = useState(false);
  const [areIssuesCreated, setCreatedIssues] = useState(false);
  
  useEffect(() => {
    if (Object.keys(issues).length === 1) {
      setCreatedIssues(true);
    }
  }, [issues]);

  const addCustomSettings = (isGameCustom: boolean) => {
    setCustomSettings(isGameCustom);
  };

  return (
    <div className={styles.wrapper}>
      <Header page={Pages.settings} />
      <main className={styles.main}>
        <GameTitle editable />
        <GameSection areIssuesCreated={areIssuesCreated} areSettingsCustom={areSettingsCustom} />
        <MembersSection />
        <SettingsSection settingsChangeHandler={addCustomSettings} />
      </main>
      <Footer page={Pages.settings} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  issues: state.issuesStore.issues,
});

export default connect(mapStateToProps)(SettingsPage);
