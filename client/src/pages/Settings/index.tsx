import GameSection from 'components/GameSection';
import { SettingsIssueTools } from 'components/issues/IssueTools/SettingsIssueTools';
import MembersSection from 'components/MembersSection';
import SettingsSection from 'components/settings/SettingsSection';
import GameTitle from 'components/shared/GameTitle';
import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import { Issues } from 'src/types/issues';
import { Pages } from 'src/types/page';
import Footer from '../../components/page-parts/Footer';
import Header from '../../components/page-parts/Header';
import styles from './style.module.scss';

export interface SettingsPageProps {
  issues: Issues;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ issues }): ReactElement => {
  const [areSettingsCustom, setCustomSettings] = useState(false);
  const [areIssuesCreated, setCreatedIssues] = useState(false);
  const { canParticipate } = useTypedSelector(({ game }) => game);

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
        <SettingsIssueTools />
        <SettingsSection
          settingsChangeHandler={addCustomSettings}
          canParticipate={canParticipate}
        />
      </main>
      <Footer page={Pages.settings} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  issues: state.issuesStore.issues,
});

export default connect(mapStateToProps)(SettingsPage);
