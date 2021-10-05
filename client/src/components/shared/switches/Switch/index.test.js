import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import Switch from './index';
import { UserRole } from '../../../../types/user';
import { SwitchType } from './types';

describe('switch', () => {
  afterEach(cleanup);
   
  test('switch should not be disabled when role is player', () => {
    let role  = UserRole.player;
    const changeRole = () => {
      role = (role === UserRole.player) ? UserRole.observer : UserRole.player;  
    };

    render(<Switch name="switchRole" type={SwitchType.role} status={role} onChange={changeRole} />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement.disabled).toBeFalsy();   
  });

    test('switch should be disabled when role is master', () => {
      let role  = UserRole.master;
      const changeRole = () => {
        role = (role === UserRole.player) ? UserRole.observer : UserRole.player;   
      };

      render(<Switch name="switchRole" type={SwitchType.role} status={role} onChange={changeRole} />);

      const switchElement = screen.getByRole('checkbox');
      expect(switchElement.disabled).toBeTruthy();
    });
});