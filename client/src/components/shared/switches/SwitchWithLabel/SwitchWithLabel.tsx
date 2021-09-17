import React, { ReactElement } from 'react';
import Switch, { SwitchProps } from 'components/shared/switches/Switch';
import styles from './style.module.scss';

interface SwitchWithLabelProps extends SwitchProps {
  label: string;
}

export const SwitchWithLabel:React.FC<SwitchWithLabelProps> = (
  {
    name,
    status,
    onChange,
    type,
    label,
  },
): ReactElement => (
  <div className={styles.switchWithLabel}>
    <div className={styles.label}>{label}</div>
    <Switch name={name} type={type} status={status} onChange={onChange} />
  </div>
);
