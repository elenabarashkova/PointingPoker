import React, { FunctionComponent, ReactElement, useState } from 'react';
import Switch from 'components/shared/Switch';
import {
  CHOICE_NO, CHOICE_YES, ROLE_OBSERVER, ROLE_USER, SWITCH_TYPE_CHOICE, SWITCH_TYPE_ROLE, ROLE_MASTER, 
} from './constants';

export const App: FunctionComponent = (): ReactElement => {
  const [role, setRole] = useState(ROLE_USER);
  const [choice, setChoice] = useState(CHOICE_NO);

  const handleRoleChange = () => {
    const newRole = (role === ROLE_USER) ? ROLE_OBSERVER : ROLE_USER;
    setRole(newRole);
  };

  const handleChoiceChange = () => {
    const newChoice = (choice === CHOICE_NO) ? CHOICE_YES : CHOICE_NO;
    setChoice(newChoice);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100px', 
      justifyContent: 'space-between', 
    }}
    >
      <Switch type={SWITCH_TYPE_ROLE} status={role} onChange={handleRoleChange} />
      <Switch type={SWITCH_TYPE_ROLE} status={ROLE_MASTER} />
      <Switch type={SWITCH_TYPE_CHOICE} status={choice} onChange={handleChoiceChange} />
    </div>
  );
};
