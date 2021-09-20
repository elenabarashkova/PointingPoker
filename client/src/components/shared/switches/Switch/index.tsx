import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import { UserRole } from '../../../../types/user';
import { SwitchType, ChoiceType } from './types';

export interface SwitchProps {
  name: string;
  type: keyof typeof SwitchType;
  status: string | boolean;
  onChange?: CallableFunction;
}

const Switch:React.FC<SwitchProps> = (
  {
    name,
    type,
    status,
    onChange,
    
  },
): ReactElement => {
  const switchConfig = {
    choice: {
      dataOn: ChoiceType.yes,
      dataOff: ChoiceType.no,
    },
    role: {
      dataOn: UserRole.observer,
      dataOff: UserRole.player,
    },
  };

  const handleChange = () => {
    console.log('свитч');
    onChange(name);
  };

  return (
    <label htmlFor={name} className={`${styles.switch} ${styles[type]}`}>
      <input
        id={name}
        type="checkbox" 
        className={styles.switchInput} 
        disabled={status === UserRole.master}
        checked={status === UserRole.observer || status === true}
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
