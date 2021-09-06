import React, { ChangeEvent, ReactElement } from 'react';
import { CHOICE_NO, CHOICE_YES } from 'src/constants';
import styles from './style.module.scss';
import { UserRole } from '../../../types/user';

interface SwitchProps {
  name: string,
  type: string,
  status: string, 
  onChange?: CallableFunction
}

const Switch:React.FC<SwitchProps> = (
  {
    type,
    status,
    onChange,
    name,
  },
): ReactElement => {
  const switchConfig = {
    choice: {
      dataOn: CHOICE_YES,
      dataOff: CHOICE_NO,
    },
    role: {
      dataOn: UserRole.observer,
      dataOff: UserRole.player,
    },
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.checked);
  };
  
  return (
    <label htmlFor={name} className={[styles.switch, styles[type]].join(' ')}>
      <input
        id={name}
        type="checkbox" 
        className={styles.switchInput} 
        disabled={status === UserRole.master}
        checked={status === UserRole.observer || status === CHOICE_YES}
        onChange={handleChange}
      />
      <span 
        className={styles.switchLabel} 
        data-on={switchConfig[type].dataOn} 
        data-off={switchConfig[type].dataOff}
      />
      <span className={styles.switchHandle} />
    </label>
  );
};

Switch.defaultProps = {
  onChange: null,
};

export default Switch;
