import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';
import Header from '../../components/page-components/Header';
import Footer from '../../components/page-components/Footer';

const SettingsPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.settings} />
    <h2>settingsPage</h2>
    <Footer page={Pages.settings} />
  </div>
);

export default SettingsPage;
