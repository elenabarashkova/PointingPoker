import React, { ReactElement, useState } from 'react';
import Switch from 'components/shared/Switch';
import styles from './style.module.scss';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {
  CHOICE_NO, CHOICE_YES,
  SWITCH_TYPE_CHOICE,
  SWITCH_TYPE_ROLE,
} from '../../constants';
import { UserRole } from '../../types/user';

const MainPage: React.FC = (): ReactElement => {
  const [role, setRole] = useState(UserRole.player);
  const [choice, setChoice] = useState(CHOICE_NO);

  const handleRoleChange = () => {
    const newRole = (role === UserRole.player) ? UserRole.observer : UserRole.player;
    setRole(newRole);
  };

  const handleChoiceChange = () => {
    const newChoice = (choice === CHOICE_NO) ? CHOICE_YES : CHOICE_NO;
    setChoice(newChoice);
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <Main />
      <Footer />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100px',
        justifyContent: 'space-between',
      }}
      >
        <Switch name="first" type={SWITCH_TYPE_ROLE} status={role} onChange={handleRoleChange} />
        <Switch name="second" type={SWITCH_TYPE_ROLE} status={UserRole.master} />
        <Switch name="third" type={SWITCH_TYPE_CHOICE} status={choice} onChange={handleChoiceChange} />
      </div>
    </div>
  );
};

export default MainPage;
