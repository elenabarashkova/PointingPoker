import React, { ReactElement } from 'react';
import Switch, { SwitchProps } from 'components/shared/switches/Switch';

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
  <div>
    <div className="label">{label}</div>
    <Switch name={name} type={type} status={status} onChange={onChange} />
  </div>
);
