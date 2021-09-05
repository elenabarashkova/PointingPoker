/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React, { ReactElement } from 'react';
import {
  CHOICE_NO, CHOICE_YES, ROLE_MASTER, ROLE_OBSERVER, ROLE_USER,
} from 'src/constants';
import styles from './style.module.scss';

interface SwitchProps {
  type: string,
  status: string, 
  onChange?: CallableFunction
}

const Switch:React.FC<SwitchProps> = ({ type, status, onChange }): ReactElement => {
  const switchConfig = {
    choice: {
      dataOn: CHOICE_YES,
      dataOff: CHOICE_NO,
    },
    role: {
      dataOn: ROLE_OBSERVER,
      dataOff: ROLE_USER,
    },
  };

  const handleChange = () => {
    onChange();
  };
  
  return (
    <label className={[styles.switch, styles[type]].join(' ')}>
      <input
        type="checkbox" 
        className={styles.switchInput} 
        disabled={status === ROLE_MASTER} 
        checked={status === ROLE_OBSERVER || status === CHOICE_YES} 
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
